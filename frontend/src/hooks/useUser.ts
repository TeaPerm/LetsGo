import { User } from "@/lib/types";
import { API_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useUser = (): User | null | undefined => {
  const token = localStorage.getItem("accesToken");

  const { data } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(API_URL + "/users", {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { user } = await response.json();
      return user;
    },
    enabled: token !== null,
  });

  return data;
};
