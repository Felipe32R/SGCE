
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { sgceService } from "../../../app/services/sgceService";


export function useEvaluationController() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['evaluations'],
    queryFn: async () => {
      return sgceService.getEvaluations(user?.id);
    }
  })

  return { evaluations: data, isLoading };
}
