import { Button } from "../../components/Button";

import { Input } from "../../components/Input";
import { useRegisterController } from "./useRegisterController";
import Modal from "react-modal";
import { useGetMainActivitys } from "../EditProfile/useEditProfileController";
import { Select } from "../../components/Select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { XCircle } from "phosphor-react";
import { PasswordInput } from "../../components/PasswordInput";
import InputMask from "react-input-mask";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../../utils/cn";

export function Register() {
  const { handleSubmit, register, errors, isLoading } = useRegisterController();
  const { mainActivitys } = useGetMainActivitys();
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cnpjFocus, setCnpjFocus] = useState(false);
  const [telephoneFocus, setTelephoneFocus] = useState(false);
  const [cellphoneFocus, setCellphoneFocus] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
            right: 0,
            position: "fixed",
            background: "rgba(1, 1, 1, 0.33)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            width: "100%",
            maxWidth: "1000px",
            position: "relative",
            inset: 0,
            borderRadius: "0.5rem",
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
        <div className="flex flex-col gap-4 text-left max-h-[500px] overflow-y-scroll text-blue-main md:p-4 p-0 pr-3">
          <h1 className="text-center text-blue-main font-bold">
            TERMO DE COMPROMISSO PARA TRATAMENTO DE DADOS PESSOAIS
          </h1>
          <h1 className="text-center">SGCE</h1>
          <p>
            <h1 className="font-medium mb-2">1. Introdução</h1>
            Este documento estabelece os termos de uso e a política de
            privacidade de dados para o acesso e utilização dos serviços
            oferecidos por [Nome da Empresa], doravante referida como "Empresa".
            Ao utilizar nossos serviços, você concorda com os termos descritos
            neste documento.
          </p>
          <p>
            <h1 className="font-medium mb-2">2. Coleta de Dados</h1>A Empresa
            coleta e armazena dados pessoais apenas quando estritamente
            necessário para a prestação de serviços ou para cumprir obrigações
            legais. Os tipos de dados coletados podem incluir, mas não estão
            limitados a: nome, endereço de e-mail, informações de contato e
            dados de uso do serviço.
          </p>
          <p>
            <h1 className="font-medium mb-2">3. Uso e Finalidade dos Dados</h1>
            Os dados coletados são utilizados exclusivamente para a prestação de
            serviços oferecidos pela Empresa, melhorias nos serviços,
            comunicação com o usuário e cumprimento de obrigações legais. Não
            compartilhamos informações pessoais com terceiros sem o
            consentimento explícito do usuário, exceto quando exigido por lei.
          </p>

          <h1 className="font-medium mb-2">4. Segurança dos Dados</h1>
          <p>
            A Empresa implementa medidas de segurança físicas, técnicas e
            administrativas para proteger os dados pessoais contra acessos não
            autorizados, divulgação, alteração e destruição. Os dados são
            armazenados em ambientes seguros e protegidos por firewalls e
            criptografia.
          </p>

          <h1 className="font-medium mb-2">5. Direitos do Titular dos Dados</h1>
          <p>
            Os usuários têm o direito de acessar, corrigir, excluir ou
            transferir seus dados pessoais. Além disso, têm o direito de revogar
            o consentimento a qualquer momento, sujeito às limitações legais.
          </p>

          <h1 className="font-medium mb-2">
            6. Cookies e Tecnologias Similares
          </h1>
          <p>
            A Empresa utiliza cookies e tecnologias similares para melhorar a
            experiência do usuário. Os usuários podem gerenciar as preferências
            de cookies através das configurações do navegador.
          </p>

          <h1 className="font-medium mb-2">
            8. Alterações na Política de Privacidade
          </h1>
          <p>
            A Empresa reserva-se o direito de modificar esta política a qualquer
            momento. As alterações serão comunicadas aos usuários por meio de
            notificação nos serviços ou por outros meios apropriados.
          </p>

          <h1 className="font-medium mb-2">9. Contato</h1>
          <p>
            Para quaisquer dúvidas, solicitações ou preocupações relacionadas à
            privacidade de dados, entre em contato conosco através dos canais
            especificados em nosso site. Ao utilizar nossos serviços, você
            concorda com os termos e condições descritos neste documento. A
            Empresa compromete-se a cumprir a legislação aplicável, incluindo a
            Lei Geral de Proteção de Dados (LGPD), garantindo a privacidade e
            segurança dos dados dos usuários.
          </p>
        </div>
      </Modal>
      <header className="flex-col justyfy-center gap-2 text-blue-main text-center">
        <strong className="text-gray-dark">Já possui uma conta? </strong>
        <strong className="cursor-pointer" onClick={() => navigate("/login")}>
          Fazer Login
        </strong>
      </header>
      <form
        onSubmit={handleSubmit}
        className={`mt-6 flex flex-col gap-4 ${errors && "pb-2"}`}
      >
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="string"
            placeholder="Nome"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            type="string"
            placeholder="Nome da empresa"
            {...register("nameCompany")}
            error={errors.nameCompany?.message}
          />
        </div>
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          error={errors.email?.message}
        />
        <div className="grid grid-cols-2 gap-2">
          <PasswordInput
            type="password"
            placeholder="Senha"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordInput
            type="password"
            placeholder="Confirme a senha"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            {cnpjFocus && (
              <span className="text-xs text-blue-dark mb-[-13px] pt-1 absolute ml-3 font-mono">
                CNPJ
              </span>
            )}
            <InputMask
              mask="99.999.999/9999-99"
              {...register("cnpj")}
              onFocusCapture={() => setCnpjFocus(true)}
              onBlur={() => setCnpjFocus(false)}
              placeholder="CNPJ"
              className={cn(
                " rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all font-mono text-sm font-medium",
                errors.cnpj && "!border-red-main"
              )}
            />
            {errors.cnpj?.message && (
              <div className="flex gap-1 items-center mt-2 text-red-main">
                <CrossCircledIcon />
                <span className="text-xs">{errors.cnpj?.message}</span>
              </div>
            )}
          </div>
          <Select
            id="select"
            {...register("type")}
            error={errors.type?.message}
          >
            <option value="" disabled selected placeholder="Ramo">
              Ramo
            </option>
            {mainActivitys &&
              mainActivitys?.map((activity) => (
                <option key={activity} value={activity}>
                  {activity}
                </option>
              ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            {telephoneFocus && (
              <span className="text-xs text-blue-dark mb-[-13px] pt-1 absolute ml-3 font-mono ">
                Telefone fixo (opcional)
              </span>
            )}
            <InputMask
              mask="(99) 9999-9999"
              {...register("telephone")}
              onFocusCapture={() => setTelephoneFocus(true)}
              onBlur={() => setTelephoneFocus(false)}
              placeholder="Telefone fixo (opcional)"
              className={cn(
                " rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all font-medium  font-mono text-sm",
                errors.telephone && "!border-red-main"
              )}
            />
            {errors.telephone?.message && (
              <div className="flex gap-1 items-center mt-2 text-red-main">
                <CrossCircledIcon />
                <span className="text-xs">{errors.telephone?.message}</span>
              </div>
            )}
          </div>
          <div>
            {cellphoneFocus && (
              <span className="text-xs text-blue-dark mb-[-13px] pt-1 absolute ml-3 font-mono">
                Celular
              </span>
            )}
            <InputMask
              mask="(99) 99999-9999"
              {...register("cellphone")}
              onFocusCapture={() => setCellphoneFocus(true)}
              onBlur={() => setCellphoneFocus(false)}
              placeholder="Celular"
              className={cn(
                " rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all font-mono text-sm font-medium",
                errors.cellphone && "!border-red-main"
              )}
            />

            {errors.cellphone?.message && (
              <div className="flex gap-1 items-center mt-2 text-red-main">
                <CrossCircledIcon />
                <span className="text-xs">{errors.cellphone?.message}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-end text-blue-main text-xs font-mono">
          <div className="flex gap-2 w-full items-center">
            <input
              className="min-h-[25px] min-w-[25px] md:min-h-[20px] md:min-w-[20px] checked:before:bg-blue-main"
              type="checkbox"
              {...register("termsAndConditions")}
            />
            <span>
              Ao criar conta, você concorda com os Termos de uso e Politica de
              privacidade.{" "}
              <span className="underline cursor-pointer" onClick={openModal}>
                Clique aqui para saber mais
              </span>
            </span>
          </div>
        </div>
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
