import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import ilustration2 from '../../../assets/ilustration2.png'
import { Button } from "../../components/Button";
import { UserSquare, XCircle } from "phosphor-react";
import { useState } from "react";

export function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const navigate = useNavigate();

  function handleSelectCandidateType(type: number){
    switch (type){
      case 1:
        navigate('/president')
        break;

    }
  }

  return (
    <div className=" text-blue-dark h-full flex items-center justify-start pt-16 gap-2 flex-col bg-blue-lighter">
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
                position: 'fixed',
                background: 'rgba(1, 1, 1, 0.33)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                width: '100%',
                height: '100%',
                maxHeight: '90%',
                maxWidth: '90%',

                position: 'relative',
                borderRadius: '0.5rem',
                inset: 0,
              },
            }}
          >
            <div className="w-full flex justify-between items-center mb-10 ">
              <h1 className="text-blue-dark  font-medium text-xl">
                Qual tipo de candidato deseja pesquisar?
              </h1>
              <XCircle
                onClick={closeModal}
                size={28}
                className="text-red-main cursor-pointer "
              />
            </div>
            <div className="flex w-full items-center justify-center text-blue-dark"><UserSquare size={62} /></div>
            <div className="flex flex-wrap gap-3 items-center mb-2 p-8">
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover" onClick={() => handleSelectCandidateType(1)}>Presidente da República</button>
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover">Deputado Federal</button>
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover">Senador</button>
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover">Governador</button>
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover">Deputado Estadual</button>
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover">Vereador</button>
              <button className=" rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover">Prefeito</button>
            </div>
          </Modal>

      <h1 className="font-medium text-md mb-2">Sistema de Gerenciamento de Campanhas Eleitorais</h1>
      <h1 className="font-medium text-xl mb-2">Bem vindo ao SGCE!</h1>

      <img src={ilustration2} alt="" className="w-full h-full max-w-[460px] max-h-[270px]"/>
      <div className="text-center text-lg mb-6">
    Realize pesquisas sobre campanhas de candidados que irá votar <br /> e fique por dentro das informações com maior clareza! Vamos lá?
      </div>
      <Button onClick={openModal}>Começar!</Button>
    </div>
  );
}
