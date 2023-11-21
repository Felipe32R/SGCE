import { useLocation } from "react-router-dom";

import ReturnButton from "../../components/ReturnButton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarCheck,
  CellSignalFull,
  ChatText,
  FacebookLogo,
  InstagramLogo,
  ShareNetwork,
  TwitterLogo,
} from "phosphor-react";

interface LocationState {
  candidate: any;
}

export function Campaign() {
  const location = useLocation();
  const state = location.state as LocationState;
  const { candidate } = state;
  console.log("candidate", candidate);
  return (
    <>
       <ReturnButton />
    
      
    <div className=" text-blue-dark h-full flex items-center justify-start pt-10 gap-2 flex-col bg-blue-lighter">
      <div className="flex justify-between items-center w-[50%] mb-5">
        <div className="flex flex-col items-start">
          <h1 className="font-medium text-xl">{`Campanha de ${candidate.nome}`}</h1>
          <h1 className="font-normal text-lg">{`Partido: ${candidate.partido}`}</h1>
          <h1 className="font-normal text-lg">{`Número: ${candidate.numero}`}</h1>
        </div>
        <img
          className="rounded-[50%] max-w-[125px] h-28"
          src="https://picsum.photos/300/200"
          alt=""
        />
      </div>
      <div className="flex w-full items-center justify-center text-gray-main gap-2">
        <h1 className="text-sm mr-2">Redes sociais: </h1>
        <div className="flex items-center gap-3">
          {candidate.redesSociais.map((redeSocial: any) => {
            const name = redeSocial.nome;

            return name === "Instagram" ? (
              <a
                href={redeSocial.link}
                target="_blank"
                className="text-instagram-main"
              >
                <InstagramLogo size={32} />
              </a>
            ) : name === "Facebook" ? (
              <a
                href={redeSocial.link}
                target="_blank"
                className="text-facebook-main"
              >
                <FacebookLogo size={32} />
              </a>
            ) : (
              <a
                href={redeSocial.link}
                target="_blank"
                className="text-twitter-main"
              >
                <TwitterLogo size={32} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col p-10 gap-4 text-white-main">
        <div className="flex gap-4 justify-between items-center w-full text-white-main">
          <div className="flex flex-col items-start  bg-blue-dark rounded-lg p-2 w-[70%] h-full break-words">
            <h1 className="font-medium mb-2 w-full break-words">Biografia:</h1>
            <p className="w-full">{candidate.campanha.biografia}</p>
          </div>
          <div className="flex flex-col items-start bg-blue-dark rounded-lg text-white-main p-2 w-1/3 h-full break-words">
            <h1 className=" mb-2 w-full break-words">
              Cargo pretendido: {candidate.cargo.nome}
            </h1>
            <p className="w-full">
              Início do mandato:{" "}
              {format(new Date(candidate.cargo.data_inicio), "dd/MM/yyyy", {
                locale: ptBR,
              })}
            </p>
            <p className="w-full">
              Fim do mandato:{" "}
              {format(new Date(candidate.cargo.data_fim), "dd/MM/yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start bg-blue-dark  rounded-lg p-2 w-full h-full break-words">
          <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
            Metas <CellSignalFull size={22} />
          </h1>
          {candidate.campanha.metas.map((meta: any) => (
            <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
              <h1 className="font-medium text-sm mb-2 w-full break-words">
                {meta.titulo}
              </h1>
              <p className="w-full text-sm">{meta.texto} </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start bg-blue-dark  rounded-lg  p-2 w-full h-full break-words">
          <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
            Realizações <CalendarCheck size={22} />
          </h1>
          {candidate.campanha.realizacoes.map((realizacao: any) => (
            <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
              <h1 className="font-medium text-sm mb-2 w-full break-words">
                {realizacao.titulo}
              </h1>
              <p className="w-full text-sm">{realizacao.texto} </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start bg-blue-dark  rounded-lg  p-2 w-full h-full break-words">
          <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
            Propostas <ChatText size={22} />
          </h1>
          {candidate.campanha.propostas.map((proposta: any) => (
            <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
              <h1 className="font-medium text-sm mb-2 w-full break-words">
                {proposta.titulo}
              </h1>
              <p className="w-full text-sm">{proposta.texto} </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start bg-blue-dark  rounded-lg  p-2 w-full h-full break-words">
          <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
            Declarações de apoio <ShareNetwork size={22} />
          </h1>
          {candidate.campanha.apoios.map((apoio: any) => (
            <>
            <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
              <h1 className="font-medium text-sm mb-2 w-full break-words">
                {apoio.candidato}
              </h1>
              <p className="w-full text-sm">{apoio.partido} </p>
            </div>
            <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
            <h1 className="font-medium text-sm mb-2 w-full break-words">
              {apoio.candidato}
            </h1>
            <p className="w-full text-sm">{apoio.partido} </p>
          </div>
          </>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
