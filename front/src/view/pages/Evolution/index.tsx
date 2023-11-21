

import { useEvolutionController } from "./useEvolutionController";

import { Loader } from "../../components/Loader";
import Chartjsline from "./ChartJsLine";

export function Evolution() {
  const { evolutions, isLoading } = useEvolutionController();


  if (isLoading) {
    return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader />;

    </div>
    )
  }
  return (
  
     <Chartjsline data={evolutions} />
    
  );
}
