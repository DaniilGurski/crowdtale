import { useState, type ComponentPropsWithRef } from "react";
import { cn } from "@lib/utils";
import { supabase } from "@lib/supabase/client";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@components/ui/input-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthApiError } from "@supabase/supabase-js";
import { Eye, EyeOff } from "lucide-react";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(4, { error: "Should be at least 4 chars " }),
});

type LoginSchemaFields = z.infer<typeof loginSchema>;

interface LoginFormProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onLoginSubmit: SubmitHandler<LoginSchemaFields> = async ({
    email,
    password,
  }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate("/");
    } catch (error) {
      if (error instanceof AuthApiError) {
        toast.error(error.message);
      }
    }
  };

  const handleSocialLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof AuthApiError) {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back !</CardTitle>
          <CardDescription>
            Login to your account to continue writing
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onLoginSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type="text"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-sm">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="flex w-full items-center"
            onClick={handleSocialLogin}
            disabled={isSubmitting}
          >
            <GoogleIcon />
            Login with Google
          </Button>

          <p className="flex justify-center gap-x-2 text-sm">
            Don't have an account ?
            <Link className="underline" to="/sign-up">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Google</title>
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  );
}
