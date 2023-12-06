
import { Loader } from "../../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

import { TextArea } from "../../components/TextArea";
import { MinusCircle, PlusCircle } from "phosphor-react";
import { Select } from "../../components/Select";
import { sgceService } from "../../../app/services/sgceService";
import toast from "react-hot-toast";
import { useRegisterCampaignController } from "./useRegisterCampaignController";

export default function RegisterCampaign() {
  const navigate = useNavigate();
  const { candidate, isLoadingProfile } =
    useRegisterCampaignController();

  const[isLoadingPostCampaign,setIsLoadingPostCampaign] = useState(false);
  const [biografia, setBiografia] = useState("");
  const [inputsApoio, setInputsApoio] = useState<any[]>([
    { candidato: "", partido: "" },
  ]);
  const [inputsPropostas, setInputsPropostas] = useState<any[]>([
    { titulo: "", texto: "" },
  ]);
  const [inputsMetas, setInputsMetas] = useState<any[]>([
    { titulo: "", texto: "" },
  ]);
  const [inputsRealizacoes, setInputsRealizacoes] = useState<any[]>([
    { titulo: "", texto: "" },
  ]);
  const [redesSociais, setRedesSociais] = useState<any[]>([
    { nome: "", link: "" },
  ]);

  useEffect(() => {
    if (!isLoadingProfile && candidate.campanha) {
      navigate("/profileCandidate");
    }
  }, [candidate]);

  const handleInputChangeApoio = (
    index: number,
    field: string,
    value: string
  ) => {
    const inputs = [...inputsApoio];
    inputs[index] = { ...inputs[index], [field]: value };
    setInputsApoio(inputs);
  };


  const addInputApoio = () => {
    setInputsApoio([...inputsApoio, ""]);
  };

  const removeInputApoio = (index: any) => {
    const inputs = [...inputsApoio];
    inputs.splice(index, 1);
    setInputsApoio(inputs);
  };


  const handleInputChangeProposta = (
    index: number,
    field: string,
    value: string
  ) => {
    const inputs = [...inputsPropostas];
    inputs[index] = { ...inputs[index], [field]: value };
    setInputsPropostas(inputs);
  };

  const addInputProposta = () => {
    setInputsPropostas([...inputsPropostas, ""]);
  };

  const removeInputProposta = (index: any) => {
    const inputs = [...inputsPropostas];
    inputs.splice(index, 1);
    setInputsPropostas(inputs);
  };


  const handleInputChangeMeta = (
    index: number,
    field: string,
    value: string
  ) => {
    const inputs = [...inputsMetas];
    inputs[index] = { ...inputs[index], [field]: value };
    setInputsMetas(inputs);
  };

  const addInputMeta = () => {
    setInputsMetas([...inputsMetas, ""]);
  };

  const removeInputMeta = (index: any) => {
    const inputs = [...inputsMetas];
    inputs.splice(index, 1);
    setInputsMetas(inputs);
  };

  const handleInputChangeRealizacao = (
    index: number,
    field: string,
    value: string
  ) => {
    const inputs = [...inputsRealizacoes];
    inputs[index] = { ...inputs[index], [field]: value };
    setInputsRealizacoes(inputs);
  };

  const addInputRealizacao = () => {
    setInputsRealizacoes([...inputsRealizacoes, ""]);
  };

  const removeInputRealizacao = (index: any) => {
    const inputs = [...inputsRealizacoes];
    inputs.splice(index, 1);
    setInputsRealizacoes(inputs);
  };

  const handleInputChangeRedesSociais = (
    index: number,
    field: string,
    value: string
  ) => {
    const inputs = [...redesSociais];
    inputs[index] = { ...inputs[index], [field]: value };
    setRedesSociais(inputs);
  };

  const addInputRedesSociais = () => {
    setRedesSociais([...redesSociais, ""]);
  };

  const removeInputRedesSociais = (index: any) => {
    const inputs = [...redesSociais];
    inputs.splice(index, 1);
    setRedesSociais(inputs);
  };
  console.log("inputsPropostas",inputsPropostas)
  async function hanldeRegisterCampaign(){
    setIsLoadingPostCampaign(true);
    try{
      const campanha = await sgceService.createCampaign({biografia,candidatoId: candidate.id})
      await Promise.all(redesSociais.map((social) => sgceService.createSocial({nome: social.nome, link: social.link, candidatoId: candidate.id})))
      await Promise.all(inputsPropostas.map((social) => sgceService.createPropose({titulo: social.titulo, texto: social.texto, campanhaId: campanha.campaignId})))
      await Promise.all(inputsMetas.map((social) => sgceService.createGoal({titulo: social.titulo, texto: social.texto, campanhaId: campanha.campaignId})))
      await Promise.all(inputsRealizacoes.map((social) => sgceService.createRealization({titulo: social.titulo, texto: social.texto, campanhaId: campanha.campaignId})))
      await Promise.all(inputsApoio.map((social) => sgceService.createSupport({candidato: social.candidato, partido: social.partido, campanhaId: campanha.campaignId})))
      setIsLoadingPostCampaign(false);
      toast.success("Campanha cadastrada com sucesso!")
      navigate("/profileCandidate")

    }catch(err){
      toast.error("Erro ao cadastrar campanha.")
    }
  }

  return (
    <>
      {isLoadingProfile || isLoadingPostCampaign ? (
        <Loader />
      ) : (
        <div className=" text-blue-dark h-full flex items-center justify-start p-2 pl-8 pr-8 md:pt-10 gap-2 flex-col bg-blue-lighter">
          <form
          onSubmit={(e) => e.preventDefault()}
            className={`w-full mt-6 flex flex-col gap-4 pb-32 `}
          >
            <h2 className="w-full text-center text-xl font-medium">
              Cadastre sua campanha
            </h2>
            <TextArea
              placeholder="Biografia"
              name="biografia"
              onChange={(e) => setBiografia(e.target.value)}
              
            />
           
                <h2 className="w-full text-start text-xl font-medium bg-blue-dark rounded-md text-yellow-light p-2">
              Minhas propostas:
            </h2>
            {inputsPropostas.map((input: any, index: number) => (
              <div className="flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-2">
                  <TextArea
                    name="titulo"
                    placeholder="Título"
                    onChange={(e) =>
                      handleInputChangeProposta(index, "titulo", e.target.value)
                    }
                  />
                  <TextArea
                    name=""
                    placeholder="Texto"
                    onChange={(e) =>
                      handleInputChangeProposta(index, "texto", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 w-full justify-end">
                  {inputsPropostas.length > 1 && (
                    <button onClick={() => removeInputProposta(index)}>
                      <MinusCircle size={28} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {inputsPropostas.length < 3 && (
              <div className="w-full flex justify-end">
                <button onClick={() => addInputProposta()}>
                  <PlusCircle size={28} />
                </button>
              </div>
            )}
             <h2 className="w-full text-start text-xl font-medium bg-blue-dark rounded-md text-yellow-light p-2">
              Minhas Metas:
            </h2>
            {inputsMetas.map((input: any, index: number) => (
              <div className="flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-2">
                  <TextArea
                    name=""
                    placeholder="Título"
                    onChange={(e) =>
                      handleInputChangeMeta(index, "titulo", e.target.value)
                    }
                  />
                  <TextArea
                    name=""
                    placeholder="Texto"
                    onChange={(e) =>
                      handleInputChangeMeta(index, "texto", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 w-full justify-end">
                  {inputsMetas.length > 1 && (
                    <button onClick={() => removeInputMeta(index)}>
                      <MinusCircle size={28} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {inputsMetas.length < 3 && (
              <div className="w-full flex justify-end">
                <button onClick={() => addInputMeta()}>
                  <PlusCircle size={28} />
                </button>
              </div>
            )}
              <h2 className="w-full text-start text-xl font-medium bg-blue-dark rounded-md text-yellow-light p-2">
              Minhas Realizações:
            </h2>
            {inputsRealizacoes.map((input: any, index: number) => (
              <div className="flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-2">
                  <TextArea
                    name=""
                    placeholder="Título"
                    onChange={(e) =>
                      handleInputChangeRealizacao(index, "titulo", e.target.value)
                    }
                  />
                  <TextArea
                    name=""
                    placeholder="Texto"
                    onChange={(e) =>
                      handleInputChangeRealizacao(index, "texto", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 w-full justify-end">
                  {inputsRealizacoes.length > 1 && (
                    <button onClick={() => removeInputRealizacao(index)}>
                      <MinusCircle size={28} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {inputsRealizacoes.length < 3 && (
              <div className="w-full flex justify-end">
                <button onClick={() => addInputRealizacao()}>
                  <PlusCircle size={28} />
                </button>
              </div>
            )}
             <h2 className="w-full text-start text-xl font-medium bg-blue-dark rounded-md text-yellow-light p-2">
              Candidatos aos quais declaro apoio:
            </h2>
            {inputsApoio.map((input: any, index: number) => (
              <div className="flex flex-col items-center gap-2">
                <div className="grid grid-cols-2 gap-3">
                  <TextArea
                    name=""
                    placeholder="Nome do candidato"
                    onChange={(e) =>
                      handleInputChangeApoio(index, "candidato", e.target.value)
                    }
                  />
                  <TextArea
                    name=""
                    placeholder="Partido do candidato"
                    onChange={(e) =>
                      handleInputChangeApoio(index, "partido", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 w-[45%] justify-end">
                  {inputsApoio.length > 1 && (
                    <button onClick={() => removeInputApoio(index)}>
                      <MinusCircle size={28} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {inputsApoio.length < 3 && (
              <div className="w-full flex justify-end">
                <button onClick={() => addInputApoio()}>
                  <PlusCircle size={28} />
                </button>
              </div>
            )}
              <h2 className="w-full text-start text-xl font-medium bg-blue-dark rounded-md text-yellow-light p-2">
              Redes Sociais:
            </h2>
            {redesSociais.map((input: any, index: number) => (
              <div className="flex flex-col items-center gap-2">
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    name=""
                    defaultValue={""}
                    onChange={(e) =>
                      handleInputChangeRedesSociais(index, "nome", e.target.value)
                    }
                  > 
                    <option value="">Selecione</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>

                  </Select>
                  <TextArea
                    name=""
                    placeholder="URL"
                    onChange={(e) =>
                      handleInputChangeRedesSociais(index, "link", e.target.value)
                    }
                  />
                </div>
                <div className="flex gap-2 w-[45%] justify-end">
                  {redesSociais.length > 1 && (
                    <button onClick={() => removeInputRedesSociais(index)}>
                      <MinusCircle size={28} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {redesSociais.length < 3 && (
              <div className="w-full flex justify-end">
                <button onClick={() => addInputRedesSociais()}>
                  <PlusCircle size={28} />
                </button>
              </div>
            )}
            <Button disabled={!biografia} className="mt-2" onClick={() => hanldeRegisterCampaign()}>
              Cadastrar campanha
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
