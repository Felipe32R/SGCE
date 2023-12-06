
import { useQuery } from "@tanstack/react-query";
import { sgceService } from "../../../app/services/sgceService";

export function useCandidatesByState(cargo: string, estado: string, cidade?:string) {


  const {data, isLoading } = useQuery({

    queryKey: ['getCandidatesByState'],
    queryFn: async () => {
      return sgceService.getCandidatesByState(cargo, estado, cidade);
    }
  })

  return { candidates: data, isLoading };
}
