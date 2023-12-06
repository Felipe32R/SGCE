
import { useQuery } from "@tanstack/react-query";

import { sgceService } from "../../../app/services/sgceService";




export function useRegisterCampaignController() {


  
  const { data: candidate, isLoading: isLoadingProfile } = useQuery({

    queryKey: ['getMyProfile'],
    queryFn: async () => {
      return sgceService.getMyProfile();
    }
  })





  return { candidate, isLoadingProfile};
}
