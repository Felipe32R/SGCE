import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { sgceService } from "../../../app/services/sgceService";

export function useEvolutionController() {
  const { user } = useAuth();

  const {data, isLoading } = useQuery({
    queryKey: ['evolution'],
    queryFn: async () => {
      return sgceService.getEvolution(user?.id);
    }
  })

  return { evolutions: data, isLoading };
}

