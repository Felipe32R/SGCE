
import { Button } from "../../components/Button";
import { useResetPasswordController } from "./useResetPasswordController";
import { PasswordInput } from "../../components/PasswordInput";


export function ResetPassword() {





  const { handleSubmit, register, errors,isLoading } = useResetPasswordController();



  return (
    <>
      <header className="flex-col justyfy-center gap-2 text-green-main text-center">
        <strong>NPS</strong>
        <p>Mudança de senha</p>
      </header>
      <form onSubmit={handleSubmit} className="mt-[40px] flex flex-col gap-4">

      

        <PasswordInput
          type="password"
          error={errors.password?.message}
          placeholder="Nova senha"
          {...register("password")}
          />
       
       <PasswordInput
        
        type="password"
        error={errors.password?.message}
        placeholder="Digite a nova senha novamente"
        {...register("confirmPassword")}
        />
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Confirmar
        </Button>
      </form>
    </>
  );
}
