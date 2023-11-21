
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { sgceService } from "../../../app/services/sgceService";

export function useHomeController() {
  const { user } = useAuth();

  const {data, isLoading } = useQuery({

    queryKey: ['getUser'],
    queryFn: async () => {
      return sgceService.getUserById(user?.id);
    }
  })

  return { user: data, isLoading };
}
