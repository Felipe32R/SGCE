import { CalendarCheck, CellSignalFull, ChatText, FacebookLogo, InstagramLogo, ShareNetwork, SignOut, TwitterLogo, XCircle } from "phosphor-react";

import { useProfileCandidateController } from "./useProfileCandidateController";
import girlIm from '../../../assets/candidata.jpg'
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader } from "../../components/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import Modal from "react-modal";
import { Button } from "../../components/Button";
import { ButtonOutlined } from "../../components/ButtonOutlined";
import { sgceService } from "../../../app/services/sgceService";
import toast from "react-hot-toast";
export default function ProfileCandidate() {
  const {signout} = useAuth();
  
  const {candidate,isLoading} = useProfileCandidateController();

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleDeleteCandidate(){
    try{
      await sgceService.deleteCandidate(candidate.id)
      toast.success("Conta deletada com sucesso.");
      signout();
    }catch(err){
      toast.error("Erro ao deletar conta.")
    }
  }

  return (
    <>
   <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            top: 0,
            bottom: 0,
            left: 0,
            inset: 0,
            right: 0,
            position: "fixed",
            background: "rgba(1, 1, 1, 0.33)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "100%",
            height: "100%",
            maxHeight: "32%",
            maxWidth: "90%",

            position: "relative",
            borderRadius: "0.5rem",
            inset: 0,
          },
        }}
      >
        <div className="w-full flex justify-between items-center mb-10 ">
          <h1 className="text-red-main  font-medium text-xl mr-5">
            Confirmar deleção de conta? 
          </h1>
          <XCircle
            onClick={closeModal}
            size={28}
            className="text-red-main cursor-pointer "
          />
        </div>
        <p className="text-sm text-red-main">Todos os seus dados serão apagados, inclusive sua campanha.</p>  
        <div className="mt-6 flex justify-end items-center gap-4">
          <Button onClick={() => handleDeleteCandidate()}>Confirmar</Button>
          <ButtonOutlined onClick={closeModal}>Cancelar</ButtonOutlined>
        </div>
      </Modal>


    <div className="w-full flex justify-end pt-8 pr-12">

    <button className="rounded-[50%]  top-[14%] right-10 text-red-main" onClick={signout}><SignOut size={34} /></button>
    </div>
 
    {!candidate || isLoading ?  <Loader/> :

    (
 <div className=" text-blue-dark h-full flex items-center justify-start pt-10 gap-2 flex-col bg-blue-lighter">
   <div className="flex justify-between items-center w-full md:w-[50%] mb-5 p-4">
     <div className="flex flex-col items-start">
       <h1 className="font-medium text-xl">{`Campanha de ${candidate?.nome}`}</h1>
       <h1 className="font-normal text-lg">{`Partido: ${candidate?.partido}`}</h1>
       <h1 className="font-normal text-lg">{`Número: ${candidate?.numero}`}</h1>
     </div>
     <img
       className="rounded-[50%] max-w-[125px] h-28 object-cover"
       src={girlIm}
       alt=""
     />
     <div className=" hidden md:flex flex-col items-center justify-center gap-2">
     <button className="border-none bg-blue-main text-white-main text-sm rounded-md p-1 w-28">Editar conta</button>
     <button className="border-none bg-red-main text-white-main text-sm rounded-md p-1 w-28" onClick={openModal}>Deletar conta</button>

     </div>
   </div>
   <div className=" flex sm:hidden flex-col items-center justify-center gap-4 mb-8">
     <button className="border-none bg-blue-main text-white-main text-sm rounded-md p-1 w-28">Editar conta</button>
     <button className="border-none bg-red-main text-white-main text-sm rounded-md p-1 w-28" onClick={openModal}>Deletar conta</button>

     </div>
   <div className="flex w-full items-center justify-center text-gray-main gap-2">
     {candidate?.redesSociais.length > 0 && 
     <>
     <h1 className="text-sm mr-2">Redes sociais: </h1>
     <div className="flex items-center gap-3">
       {candidate?.redesSociais.map((redeSocial: any) => {
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
     </>
     }
   </div>
   <div className="w-full flex flex-col p-3 md:p-10 gap-4 text-white-main">
     <div className="flex flex-col md:flex-row h-full  gap-4 justify-between items-center w-full text-white-main">
       <div className="flex flex-col items-start  bg-blue-dark rounded-lg p-2 w-full md:w-[70%] h-full break-words">
         <h1 className="font-medium mb-2 w-full break-words">Biografia:</h1>
         <p className="w-full">{candidate?.campanha.biografia}</p>
       </div>
       <div className="flex flex-col items-start bg-blue-dark rounded-lg text-white-main p-2 w-full md:w-1/3 h-full break-words">
         <h1 className=" mb-2 w-full break-words">
           Cargo pretendido: {candidate?.cargo.nome}
         </h1>
         <p className="w-full">
           Início do mandato:{" "}
           {format(new Date(candidate?.cargo.data_inicio), "dd/MM/yyyy", {
             locale: ptBR,
           })}
         </p>
         <p className="w-full">
           Fim do mandato:{" "}
           {format(new Date(candidate?.cargo.data_fim), "dd/MM/yyyy", {
             locale: ptBR,
           })}
         </p>
       </div>
     </div>
     <div className="flex flex-col items-start bg-blue-dark  rounded-lg p-2 w-full h-full break-words">
       <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
         Metas <CellSignalFull size={22} />
       </h1>
       {candidate?.campanha.metas.length > 0 ? candidate?.campanha.metas.map((meta: any) => (
         <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
           <h1 className="font-medium text-sm mb-2 w-full break-words">
             {meta.titulo}
           </h1>
           <p className="w-full text-sm">{meta.texto} </p>
         </div>
       )): <div className="flex w-full justify-center text-yellow-main">Vazio</div>}
     </div>
     <div className="flex flex-col items-start bg-blue-dark  rounded-lg  p-2 w-full h-full break-words">
       <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
         Realizações <CalendarCheck size={22} />
       </h1>
       {candidate?.campanha.realizacoes.length > 0 ? candidate?.campanha.realizacoes.map((realizacao: any) => (
         <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
           <h1 className="font-medium text-sm mb-2 w-full break-words">
             {realizacao.titulo}
           </h1>
           <p className="w-full text-sm">{realizacao.texto} </p>
         </div>
       )) : <div className="flex w-full justify-center text-yellow-main">Vazio</div> }
     </div>
     <div className="flex flex-col items-start bg-blue-dark  rounded-lg  p-2 w-full h-full break-words">
       <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
         Propostas <ChatText size={22} />
       </h1>
       { candidate?.campanha.propostas.length > 0 ?  candidate?.campanha.propostas.map((proposta: any) => (
         <div className="flex flex-col w-full p-2 border-b-2 border-blue-main mb-2">
           <h1 className="font-medium text-sm mb-2 w-full break-words">
             {proposta.titulo}
           </h1>
           <p className="w-full text-sm">{proposta.texto} </p>
         </div>
       )): <div className="flex w-full justify-center text-yellow-main">Vazio</div>}
     </div>
     <div className="flex flex-col items-start bg-blue-dark  rounded-lg  p-2 w-full h-full break-words">
       <h1 className="font-medium mb-2 w-full break-words flex items-center gap-2 justify-center">
         Declarações de apoio <ShareNetwork size={22} />
       </h1>
       { candidate?.campanha.apoios.length > 0 ? candidate?.campanha.apoios.map((apoio: any) => (
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
       )) : <div className="flex w-full justify-center text-yellow-main">Vazio</div> }
     </div>
   </div>
 </div> )} 
 </>
  )
}
