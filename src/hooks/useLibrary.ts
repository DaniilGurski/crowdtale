import { getUserLibrary } from "@services/api";
import { useQuery } from "@tanstack/react-query";

export const useLibrary = () => {
  return useQuery({
    queryFn: getUserLibrary,
    queryKey: ["library"],
  });
};
