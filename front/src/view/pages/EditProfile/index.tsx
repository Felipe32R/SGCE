import { Button } from "../../components/Button";

import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import {
  useEditProfileController,
  useGetMainActivitys,
} from "./useEditProfileController";
import { useHomeController } from "../Home/useHomeController";
import { Loader } from "../../components/Loader";
import { ButtonOutlined } from "../../components/ButtonOutlined";
import { useNavigate } from "react-router-dom";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import InputMask from "react-input-mask";
import { cn } from "../../../utils/cn";
import { useEffect, useState } from "react";

export function EditProfile() {
  const { user, isLoading } = useHomeController();
  const { mainActivitys } = useGetMainActivitys();
  const { handleSubmit, register, errors, isLoadingEdit } =
    useEditProfileController();
  const [telephoneFocus, setTelephoneFocus] = useState(false);
  const [cellphoneFocus, setCellphoneFocus] = useState(false);

  useEffect(() => {
    setTelephoneFocus(true);
    setCellphoneFocus(true);

  },[])

  const navigate = useNavigate();

  if (isLoading || isLoadingEdit) {
    return <Loader />;
  }
  return (
    <>
      <strong className="text-2xl text-green-dark">Dados cadastrais</strong>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full text-green-dark h-full md:grid md:grid-rows-2"
      >
        <div className="mt-8  flex flex-col gap-4 text-green-dark items-center md:grid md:grid-cols-2 md:gap-2">
          <Input
            placeholder="Nome"
            defaultValue={user?.name}
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            placeholder="Nome da empresa"
            defaultValue={user?.nameCompany}
            {...register("nameCompany")}
            error={errors.nameCompany?.message}
          />
          <Input
          disabled
          name="email"
            placeholder="Email"
            defaultValue={user?.email}
          />
          <div>
          <span className="text-xs font-medium text-green-dark mb-[-13px] pt-1 absolute ml-3 font-mono">
                CNPJ
              </span>
           <InputMask
            disabled
            mask="99.999.999/9999-99"
            name="cnpj"
            placeholder="CNPJ"
            className=" rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all disabled:bg-gray-lighter disabled:cursor-not-allowed"
            defaultValue={user?.cnpj}
          />
          </div>
          <div>
            {telephoneFocus && (
              <span className="text-xs font-medium text-green-dark mb-[-13px] pt-1 absolute ml-3 font-mono">
                Telefone fixo
              </span>
            )}
            <InputMask
              defaultValue={user?.telephone}
              mask="(99) 9999-9999"
              {...register("telephone")}
              onFocusCapture={() => setTelephoneFocus(true)}
              onBlur={() => setTelephoneFocus(false)}
              placeholder="Telefone fixo"
              className={cn(
                " rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all",
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
              <span className="text-xs font-medium text-green-dark mb-[-13px] pt-1 absolute ml-3 font-mono">
                Celular
              </span>
            )}
            <InputMask
              defaultValue={user?.cellphone}
              mask="(99) 99999-9999"
              {...register("cellphone")}
              onFocusCapture={() => setCellphoneFocus(true)}
              onBlur={() => setCellphoneFocus(false)}
              placeholder="Celular"
              className={cn(
                " rounded-lg border border-gray-light pt-4 px-3 h-12 bg-white-main w-full peer placeholder-shown:pt-0 focus:border-gray-dark outline-none transition-all",
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
          <Select
            id="select"
            {...register("type")}
            error={errors.type?.message}
          >
            <option value="" disabled selected placeholder="Categoria">
              Ramo de atuação
            </option>
            <option
              value={user?.type}
              disabled
              selected
              placeholder="Categoria"
            >
              {user?.type}
            </option>
            {mainActivitys &&
              mainActivitys?.map((activity) => (
                <option value={activity}>{activity}</option>
              ))}
          </Select>
        </div>

        <div className="flex w-full justify-end h-auto mt-10 gap-2">
          <ButtonOutlined type="button" onClick={() => navigate(-1)}>
            Cancelar
          </ButtonOutlined>
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </>
  );
}
