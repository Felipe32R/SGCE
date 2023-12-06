import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ilustration2 from "../../../assets/ilustration2.png";
import { Button } from "../../components/Button";
import { UserSquare, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";

import { cn } from "../../../utils/cn";
import { Select } from "../../components/Select";
import json from "../../../utils/states-cities.json";


interface LocationState {
  returnValue: boolean | null;
}

enum Cargos {
  "Presidente" = 1,
  "Deputado Federal" = 2,
  "Senador" = 3,
  "Governador" = 4,
  "Deputado Estadual" = 5,
  "Vereador" = 6,
  "Prefeito" = 7,
}

export function Home() {
  const navigate = useNavigate();

  const location = useLocation();
  const locationState = location.state as LocationState;
  const returnValue = locationState ? locationState.returnValue : false;

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [selectedStateCities, setSelectedStateCities] = useState<string[]>([]);

  const showUf = selectedType !== 0 && selectedType !== 1;
  const showCities =
    selectedState && (selectedType === 6 || selectedType === 7);
  const states = json.estados.map((state: any) => {
    const obj = { nome: state.nome, sigla: state.sigla };

    return obj;
  });


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (returnValue) openModal();
  }, [returnValue]);

  useEffect(() => {
    const selectedStateCities = json.estados.find(
      (state: any) => state.sigla === selectedState
    );
    if (selectedStateCities) {
      setSelectedStateCities(selectedStateCities?.cidades);
    }
  }, [selectedState]);

  async function handleSearchCandidates() {
    navigate("/candidates", {
      state: {
        cargo: Cargos[selectedType],
        estado: selectedState,
        cidade: selectedCity,
      },
    });
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
            position: "fixed",
            background: "rgba(1, 1, 1, 0.33)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "100%",
            height: "100%",
            maxHeight: "90%",
            maxWidth: "90%",

            position: "relative",
            borderRadius: "0.5rem",
            inset: 0,
          },
        }}
      >
        <div className="w-full flex justify-between items-center mb-10 ">
          <h1 className="text-blue-dark  font-medium text-xl mr-5">
            Qual tipo de candidato deseja pesquisar?
          </h1>
          <XCircle
            onClick={closeModal}
            size={28}
            className="text-red-main cursor-pointer "
          />
        </div>
        <div className="flex w-full items-center justify-center text-blue-dark">
          <UserSquare size={62} />
        </div>
        <div className="flex flex-wrap gap-3 items-center mb-2 md:p-8 p-2">
          <button
            className="w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover"
            onClick={() => navigate('/president')}
          >
            Presidente da República
          </button>
          <button
            onClick={() => setSelectedType(2)}
            className={cn(
              "w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover",
              selectedType === 2 &&
                "border-[3px] border-yellow-main outline-none bg-blue-dark hover:bg-blue-dark"
            )}
          >
            Deputado Federal
          </button>
          <button
            onClick={() => setSelectedType(3)}
            className={cn(
              "w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover",
              selectedType === 3 &&
                "border-[3px] border-yellow-main outline-none bg-blue-dark hover:bg-blue-dark"
            )}
          >
            Senador
          </button>
          <button
            onClick={() => setSelectedType(4)}
            className={cn(
              "w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover",
              selectedType === 4 &&
                "border-[3px] border-yellow-main outline-none bg-blue-dark hover:bg-blue-dark"
            )}
          >
            Governador
          </button>
          <button
            onClick={() => setSelectedType(5)}
            className={cn(
              "w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover",
              selectedType === 5 &&
                "border-[3px] border-yellow-main outline-none bg-blue-dark hover:bg-blue-dark"
            )}
          >
            Deputado Estadual
          </button>
          <button
            onClick={() => setSelectedType(6)}
            className={cn(
              "w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover",
              selectedType === 6 &&
                "border-[3px] border-yellow-main outline-none bg-blue-dark hover:bg-blue-dark"
            )}
          >
            Vereador
          </button>
          <button
            onClick={() => setSelectedType(7)}
            className={cn(
              "w-full md:w-auto rounded-lg font-medium  border-blue-main p-4 text-white-main bg-blue-main hover:bg-blue-hover",
              selectedType === 7 &&
                "border-[3px] border-yellow-main outline-none bg-blue-dark hover:bg-blue-dark"
            )}
          >
            Prefeito
          </button>
        </div>
        <div className="flex justify-center gap-4 items-start w-full md:h-[35%] h-[5%] pt-4">
          {showUf && (
            <Select
              defaultValue=""
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="" disabled>
                Selecione um estado
              </option>
              {states &&
                states.map((uf: any) => (
                  <option value={uf.sigla}>{uf.nome}</option>
                ))}
            </Select>
          )}
          {showCities && (
            <Select
              defaultValue=""
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="" disabled>
                Selecione uma cidade
              </option>
              {selectedStateCities &&
                selectedStateCities.map((city: any) => (
                  <option value={city}>{city}</option>
                ))}
            </Select>
          )}
        </div>
        <div className="flex w-full justify-center">
          <Button onClick={() => handleSearchCandidates()} disabled={!selectedType || !selectedState}>Buscar</Button>
        </div>
      </Modal>

      <h1 className="font-medium text-md mb-2 pr-3 pl-3 text-center">
        Sistema de Gerenciamento de Campanhas Eleitorais
      </h1>
      <h1 className="font-medium text-xl mb-2">Bem vindo ao SGCE!</h1>

      <img
        src={ilustration2}
        alt=""
        className="w-full h-full max-w-[460px] max-h-[270px]"
      />
      <div className="text-center text-lg mb-6 pr-3 pl-3">
        Realize pesquisas sobre campanhas de candidados que irá votar <br /> e
        fique por dentro das informações com maior clareza! Vamos lá?
      </div>
      <Button onClick={openModal}>Começar!</Button>
    </div>
  );
}
