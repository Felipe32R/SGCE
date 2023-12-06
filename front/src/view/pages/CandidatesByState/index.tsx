import { useLocation, useNavigate } from "react-router-dom";

import ReturnButton from "../../components/ReturnButton";
import { useCandidatesByState } from "./useCandidatesByState";
import { Loader } from "../../components/Loader";

interface LocationState{
  cargo: string;
  estado: string;
  cidade?: string;
}

export function CandidatesByState() {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const {cargo,estado,cidade } = locationState;

  const { candidates, isLoading } = useCandidatesByState(cargo,estado,cidade);
  const navigate = useNavigate();


  console.log("cargo", cargo,estado,cidade)
  return (


    <div className=" text-blue-dark h-full flex items-center justify-start pt-10 gap-2 flex-col bg-blue-lighter mt-10">
      <ReturnButton/>
      <h1 className="font-medium">Candidatos a {cargo} - {estado} {cidade && ` - ${cidade}`}</h1>

      <div className="flex flex-wrap items-start gap-3 p-10 w-full h-full">
        {isLoading ? <Loader/> : candidates.map((candidate:any) => 
          <div className="w-60 border-2 border-blue-main rounded-lg flex flex-col items-center p-2 gap-2 hover:bg-blue-cardhover cursor-pointer transition-all" onClick={() => navigate('/candidateCampaign', {state: {candidate}})}>
            <div className="font-medium mb-2">{candidate.nome}</div>
            <img className="rounded-[50%] max-w-[125px] h-28" src="https://picsum.photos/300/200" alt="" />
            <div className=" text-gray-main text-lg">{candidate.partido}</div>
            <div className="text-2xl font-bold text-blue-main">{candidate.numero}</div>

          </div>
        )}
        {candidates && candidates?.length === 0 && <div className="w-full h-full text-center">Nenhum candidato encontrado para o filtro selecionado.</div> }
      </div>
    </div>
  );
}
