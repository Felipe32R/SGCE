import { useNavigate } from "react-router-dom";

import ReturnButton from "../../components/ReturnButton";
import { usePresidentController } from "./usePresidentController";
import { Loader } from "../../components/Loader";

import girlIm from '../../../assets/candidata.jpg'
export function President() {

  const { candidates, isLoading } = usePresidentController();

  const navigate = useNavigate();



  return (


    <div className=" text-blue-dark h-full flex items-center justify-start pt-10 gap-2 flex-col bg-blue-lighter mt-10">
      <ReturnButton/>
      <h1 className="font-medium">Candidatos a Presidente da República</h1>

      <div className="flex flex-wrap items-start gap-3 p-10 w-full h-full">
        {isLoading ? <Loader/> : candidates.map((candidate:any) => 
          <div className="w-60 border-2 border-blue-main rounded-lg flex flex-col items-center p-2 gap-2 hover:bg-blue-cardhover cursor-pointer transition-all" onClick={() => navigate('/candidateCampaign', {state: {candidate}})}>
            <div className="font-medium mb-2">{candidate.nome}</div>
            <img className="rounded-[50%] max-w-[125px] h-28 object-cover" src={girlIm} alt="" />
            <div className=" text-gray-main text-lg">{candidate.partido}</div>
            <div className="text-2xl font-bold text-blue-main">{candidate.numero}</div>

          </div>
        )}
      </div>
    </div>
  );
}
