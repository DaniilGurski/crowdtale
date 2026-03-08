import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { getProfileById, updateUsername } from "@/services/api";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Field, FieldError, FieldLabel } from "@components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import LogoutButton from "@components/LogoutButton";
import { useUser } from "@/hooks/useUser";
import NavigationHeader from "@/components/NavigationHeader";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be at most 30 characters" }),
});

type ProfileFormFields = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return;
      return await getProfileById(user.id);
    },
    enabled: !!user,
  });

  const { handleSubmit, control } = useForm<ProfileFormFields>({
    resolver: zodResolver(schema),
    values: {
      username: profile?.username ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newUsername: string) => updateUsername(newUsername),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success("Username updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update username. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<ProfileFormFields> = ({ username }) => {
    mutation.mutate(username);
  };

  return (
    <div className="w-full">
      <NavigationHeader />
      <div className="mx-auto flex w-[95%] max-w-3xl flex-col gap-y-6 p-6 sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Username</CardTitle>
            <CardDescription>
              This is how other users will see you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                    />
                    {fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Button
                className="justify-self-end"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Sign out of your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LogoutButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
