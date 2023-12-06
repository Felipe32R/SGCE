
import { useQuery } from "@tanstack/react-query";
import { sgceService } from "../../../app/services/sgceService";

export function useProfileCandidateController() {


  const {data, isLoading } = useQuery({

    queryKey: ['getMyProfileCandidate'],
    queryFn: async () => {
      return sgceService.getMyProfile();
    }
  })

  return { candidate: data, isLoading };
}
