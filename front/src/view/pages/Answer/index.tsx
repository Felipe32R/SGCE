import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useAnswerController } from './useAnswerController';
import RadioGroup from './RadioGroup';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { sgceService } from '../../../app/services/sgceService';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import { TextArea } from '../../components/TextArea';
import { Loader } from '../../components/Loader';
import { useState } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../../utils/cn';
import loginIlustrationImg from '../../../assets/loginIlustration.svg';
import avalieMe from '../../../assets/avalieMe.png';
import { XCircle } from 'phosphor-react';
export function Answer() {
  const { handleSubmit, register, errors, isLoadingPost } =
    useAnswerController();
  const [telephoneFocus, setTelephoneFocus] = useState(false);
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery(['user', id], () =>
    sgceService.getUserById(Number(id))
  );



  if (isLoading || isLoadingPost) {
    return <Loader />;
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'fixed',
                background: 'rgba(1, 1, 1, 0.33)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              content: {
                width: '100%',
                maxWidth: '1000px',
                position: 'relative',
                inset: 0,
                borderRadius: '0.5rem',
              },
            }}
          >
            <div className="w-full flex justify-center items-center pb-6 ">
              <XCircle
                onClick={closeModal}
                size={28}
                className="text-red-main cursor-pointer absolute right-4"
              />
            </div>
            <div className="flex flex-col gap-4 text-left max-h-[500px] overflow-y-scroll text-green-main md:p-4 p-0 pr-3">
              <h1 className="text-center text-green-main font-bold">
                TERMO DE COMPROMISSO PARA TRATAMENTO DE DADOS PESSOAIS
              </h1>
              <h1 className="text-center">
                SERVIÇO ABRASEL DE AVALIAÇÃO NPS PARA BARES E RESTAURANTES
              </h1>
              <p>
                1. O Serviço Abrasel de Avaliação NPS para Bares e Restaurantes
                é uma pesquisa de mercado que busca avaliar a probabilidade de o
                estabelecimento contratante do serviço ser recomendado pelo
                cliente a amigos e conhecidos.
              </p>
              <p>
                2. Para realizar o Serviço Abrasel de Avaliação NPS para Bares e
                Restaurantes, a Abrasel tratará os dados dos clientes dos
                estabelecimentos que contratarem o serviço, o que inclui, entre
                outros, a coleta, o armazenamento, a análise e o
                compartilhamento destes dados com o contratante, incluindo os de
                caráter pessoal como nome, e-mail e telefone dos respondentes da
                pesquisa.
              </p>
              <p>
                3. O estabelecimento que desejar ser avaliado na pesquisa e ter
                acesso às informações do respondente, a seguir referido como
                Cliente, deverá aceitar os termos de finalidade, utilização,
                confidencialidade e segurança dos dados, mencionados abaixo.
              </p>
              <h1 >
                4. Finalidade e Utilização dos Dados
              </h1>
              <div className="ml-4 flex flex-col gap-2">
                <p>
                  4.1. Os dados pessoais coletados na Pesquisa serão utilizados
                  pelo estabelecimento contratante, a seguir referido como
                  Empresa, exclusivamente para entrar em contato com o Cliente a
                  fim de discutir a avaliação feita durante a visita, e,
                  eventualmente e sob autorização deste, enviar-lhe campanhas de
                  marketing.
                </p>
                <p>
                  4.2. A Empresa compromete-se a utilizar os dados pessoais do
                  Cliente apenas para os fins autorizados pela Abrasel, não
                  realizando qualquer processamento adicional sem consentimento
                  prévio.
                </p>
              </div>

              <h1 >
                5. Confidencialidade e Segurança dos Dados
              </h1>

              <div className="ml-4 flex flex-col gap-2">
                <p>
                  5.1. A Empresa compromete-se a manter a confidencialidade e a
                  segurança dos dados pessoais compartilhados do Cliente,
                  adotando medidas técnicas e organizacionais adequadas para
                  evitar acesso não autorizado, perda, alteração ou divulgação
                  indevida.
                </p>
                <p>
                  5.2. A Empresa garantirá que seus funcionários ou qualquer
                  terceiro envolvido no tratamento e/ou processamento dos dados
                  pessoais estejam cientes de suas obrigações de
                  confidencialidade e adotem as devidas medidas de segurança.
                </p>
              </div>

              <p className="mb-4">
                Ao confirmar a inscrição do estabelecimento no SERVIÇO ABRASEL DE
            AVALIAÇÃO NPS PARA BARES E RESTAURANTES, o representante responsável pela empresa reconhece ter lido, compreendido e concordado com
            todas as disposições contidas no formulário de cadastro.
              </p>
            </div>
          </Modal>
          <div className="flex w-full h-full">
            <div
              className={`bg-green-light w-full h-full lg:w-1/2  ${
                location.pathname === '/register' && '!w-full'
              }  flex items-center justify-center flex-col`}
            >
              <img src={avalieMe} className="md:h-12 h-8" />

              <div
                className={`md:mt-6 w-full max-w-[570px] md:px-8 px-4 mt-3  ${
                  location.pathname === '/register' && 'max-w-[800px]'
                }`}
              >
                <div>
                  <div>
                    <header className="flex-col justyfy-center  text-green-main text-center">
                      <strong className=" text-xl">{data?.nameCompany}</strong>
                      <p>
                        De 0 a 10, quanto você recomenda esse estabelecimento a
                        um amigo, colega ou familiar?
                      </p>
                    </header>
                    <form
                      onSubmit={handleSubmit}
                      className="mt-[40px] flex flex-col gap-4"
                    >
                      <RadioGroup />
                      <TextArea
                        maxLength={600}
                        error={errors.justification?.message}
                        placeholder="Justificativa (opcional)"
                        {...register('justification')}
                      />
                      <Input
                        type="email"
                        error={errors.email?.message}
                        placeholder="E-mail (opcional)"
                        {...register('email')}
                      />

                      <div>
                        {telephoneFocus && (
                          <span className="text-xs text-green-dark mb-[-13px] pt-1 absolute ml-3 ">
                            Telefone (opcional)
                          </span>
                        )}
                        <InputMask
                          mask="(99) 99999-9999"
                          {...register('telephone')}
                          onFocusCapture={() => setTelephoneFocus(true)}
                          onBlur={() => setTelephoneFocus(false)}
                          placeholder="Telefone (opcional)"
                          className={cn(
                            ' rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all font-medium  font-mono text-sm',
                            errors.telephone && '!border-red-main'
                          )}
                        />
                        {errors.telephone?.message && (
                          <div className="flex gap-1 items-center mt-2 text-red-main">
                            <CrossCircledIcon />
                            <span className="text-xs">
                              {errors.telephone?.message}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex  items-center justify-end text-green-main text-xs font-mono">
                        <div className="flex gap-2 w-full items-center justify-center">
                          <span>
                            Ao enviar sua avaliação, você concorda com os{' '}
                            <span
                              className="underline cursor-pointer"
                              onClick={openModal}
                            >
                              termos de uso.
                            </span>
                          </span>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="mt-2"
                        isLoading={isLoading}
                      >
                        Enviar avaliação
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`bg-blue-500  w-1/2  h-full hidden lg:flex justify-center items-center p-8  ${
                location.pathname === '/register' && '!hidden'
              }`}
            >
              <img
                src={loginIlustrationImg}
                className={`w-full h-full max-w-[656] max-h-[950px]  ${
                  location.pathname === '/register' && 'hidden'
                }`}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
