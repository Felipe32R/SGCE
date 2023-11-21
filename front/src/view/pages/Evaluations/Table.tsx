import { Eye, Plus, WarningCircle, XCircle } from 'phosphor-react';
import { EvaluationsResponse } from '../../../app/services/sgceService';
import { useState } from 'react';
import Modal from 'react-modal';
interface TableData {
  evaluations: Array<EvaluationsResponse> | undefined;
}

Modal.setAppElement('#root');

export function Table({ evaluations }: TableData) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [justification, setJustification] = useState<EvaluationsResponse>();

  function openModal(justification: EvaluationsResponse) {
    setIsOpen(true);
    setJustification(justification);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-full">
      {evaluations?.length == 0 ? (
        <div className="w-full h-full text-xl text-green-dark flex justify-center items-center">
          Nenhuma avaliação encontrada{' '}
          <WarningCircle className="ml-2" size={28} />
        </div>
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
                maxWidth: '90%',
                overflowY: 'scroll',
                position: 'relative',
                borderRadius: '0.5rem',
                inset: 0,
              },
            }}
          >
            <div className="w-full flex justify-between items-center mb-10 ">
              <strong className="text-green-dark text-2xl">
                Detalhamento da avaliação
              </strong>
              <XCircle
                onClick={closeModal}
                size={28}
                className="text-red-main cursor-pointer "
              />
            </div>
            {justification && (
              <>
                <div className="grid-cols-1 grid md:grid-cols-[0.5fr,0.7fr,2.5fr,1.5fr,1.5fr,1fr] bg-gray-lighter font-bold p-2">
                  <h1 >
                    Nota
                    <span className="md:hidden inline-block font-normal ">
                      : {justification?.value}
                    </span>
                  </h1>
                  <h1>
                    Status
                    <span
                      className={`md:hidden inline-block font-bold ${
                        justification.status == 'Promotor'
                          ? 'text-green-main'
                          : justification.status == 'Detrator'
                          ? 'text-red-main'
                          : 'text-yellow-main'
                      }`}
                    >
                      : {justification.status}
                    </span>
                  </h1>
                  <h1>
                    E-mail
                    <span className="font-normal md:hidden inline-block ">
                      : {justification.email || 'Não informado'}aaa
                    </span>
                  </h1>
                  <h1>
                    Telefone
                    <span className="font-normal md:hidden inline-block">
                      : {justification.telephone || 'Não informado'}
                    </span>
                  </h1>
                  <h1>
                    Data
                    <span className="font-normal md:hidden inline-block">
                      :{' '}
                      {`${new Date(justification.createdAt).getDate()}/${
                        new Date(justification.createdAt).getMonth() + 1
                      }/${new Date(justification.createdAt).getFullYear()}`}
                    </span>
                  </h1>
                  <h1>
                    Origem
                    <span className="font-normal md:hidden inline-block">
                      : {justification.origin == 'socialMedia'
                        ? 'Mídia social'
                        : 'QR code'}
                    </span>
                  </h1>
                 
                </div>

                <div className="hidden md:grid md:grid-cols-[0.5fr,0.7fr,2.5fr,1.5fr,1.5fr,1fr] bg-gray-lighter p-2 ">
                  <div >{justification.value}</div>
                  <div
                    className={`font-bold ${
                      justification.status == 'Promotor'
                        ? 'text-green-main'
                        : justification.status == 'Detrator'
                        ? 'text-red-main'
                        : 'text-yellow-main'
                    }`}
                  >
                    {' '}
                    {justification.status}
                  </div>
                  <div className="">
                    {justification.email || 'Não informado'}
                  </div>
                  <div>{justification.telephone || 'Não informado'}</div>
                  <div>{`${new Date(justification.createdAt).getDate()}/${
                    new Date(justification.createdAt).getMonth() + 1
                  }/${new Date(
                    justification.createdAt
                  ).getFullYear()} - ${new Date(
                    justification.createdAt
                  ).getHours()}:${new Date(
                    justification.createdAt
                  ).getMinutes()}`}</div>
                <div>
                {justification.origin == 'socialMedia'
                        ? 'Mídia social'
                        : 'QR code'}
                </div>
                </div>
              </>
            )}
            <h1 className="font-bold mt-3 mb-2 text-left">Justificativa</h1>
            <p className="break-words text-sm overflow-y-scroll max-h-64">
              {justification?.justification || 'Não informado'}
            </p>
          </Modal>
          <table className="w-full text-sm text-left text-gray-main dark:text-gray-400 md:block hidden">
            <thead className="text-xs text-gray-dark uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 bg-white-main">
              <tr>
                <th scope="col" className="px-5 py-3">
                  Nota
                </th>
                <th scope="col" className="px-5 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-5 py-3">
                  Justificativa
                </th>
                <th scope="col" className="px-5 py-3">
                  Telefone
                </th>
                <th scope="col" className="px-5 py-3">
                  Status
                </th>
                <th scope="col" className="px-5 py-3">
                  Data
                </th>
                <th scope="col" className="px-5 py-3">
                  Origem
                </th>
              </tr>
            </thead>
            <tbody>
              {evaluations?.map((evaluation) => {
                const status =
                  evaluation.value >= 9
                    ? 'Promotor'
                    : evaluation.value <= 6
                    ? 'Detrator'
                    : 'Neutro';
                evaluation.status = status;
                return (
                  <tr
                    key={evaluation.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 text-green-dark text-xl text-gray-900 whitespace-nowrap dark:text-white font-bold"
                    >
                      {evaluation.value}
                    </th>
                    <td className="px-5 py-4 max-w-[240px] break-words">
                      {evaluation.email || 'Não informado'}
                    </td>
                    <td className="px-5 py-4 max-w-[180px]  overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {evaluation.justification || 'Não informado'}{' '}
                      <Eye
                        onClick={() => openModal(evaluation)}
                        size={22}
                        className="cursor-pointer text-green-main"
                      />
                    </td>
                    <td className="px-5 py-4 max-w-[240px]  overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {evaluation.telephone || 'Não informado'}
                    </td>
                    <td
                      className={`px-5 py-4 font-bold ${
                        status == 'Promotor'
                          ? 'text-green-main'
                          : status == 'Detrator'
                          ? 'text-red-main'
                          : 'text-yellow-main'
                      }`}
                    >
                      {status}
                    </td>
                    <td className="px-6 py-4">{`${new Date(
                      evaluation.createdAt
                    ).getDate()}/${
                      new Date(evaluation.createdAt).getMonth() + 1
                    }/${new Date(evaluation.createdAt).getFullYear()}`}</td>

                    <td className="px-6 py-4">
                      {evaluation.origin == 'socialMedia'
                        ? 'Mídia social'
                        : 'QR code'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col w-full md:hidden">
            {evaluations?.map((evaluation) => {
              const status =
                evaluation.value >= 9
                  ? 'Promotor'
                  : evaluation.value <= 6
                  ? 'Detrator'
                  : 'Neutro';
              evaluation.status = status;
              return (
                <div className='flex flex-col'>
                <div className="grid grid-cols-4 w-full">
                  <div
                    className={`flex items-center justify-center py-4 font-bold ${
                      status == 'Promotor'
                        ? 'text-green-main'
                        : status == 'Detrator'
                        ? 'text-red-main'
                        : 'text-yellow-main'
                    }`}
                  >
                    {status}
                  </div>

                  <div className="flex items-center justify-center text-green-dark text-lg text-gray-900">
                    {evaluation.value}
                  </div>

                  <div className="flex justify-center  flex-col items-start overflow-ellipsis overflow-hidden whitespace-nowrap">
                    <div className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
                      {evaluation.justification }
                    </div>
                    
                  </div>

                  <div className="flex items-center justify-center">
                    <Plus
                      size={28}
                      onClick={() => openModal(evaluation)}
                      className="text-green-dark "
                    />
                  </div>
                </div>
                  <div className="flex items-center pl-2 pb-2 justify-start overflow-ellipsis overflow-hidden whitespace-nowrap border-green-dark border-b-[1px]">
                      {evaluation.email}
                    </div>
                    </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
