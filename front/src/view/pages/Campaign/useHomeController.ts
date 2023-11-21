
import { useQuery } from "@tanstack/react-query";
import { sgceService } from "../../../app/services/sgceService";

export function useHomeController() {


  const {data, isLoading } = useQuery({

    queryKey: ['getPresidents'],
    queryFn: async () => {
      return sgceService.getPresidents();
    }
  })

  return { candidates: data, isLoading };
}
