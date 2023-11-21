import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ButtonOutlined } from "../../components/ButtonOutlined";
import { useLoginController } from "./useLoginController";
import { PasswordInput } from "../../components/PasswordInput";



export function Login() {
  const navigate = useNavigate();
  const { handleSubmit, register, errors, isLoading } = useLoginController();


  return (
    <>
      <header className="flex-col justyfy-center gap-2 text-blue-dark text-center">

        <p>Acesse agora e cadastre sua campanha</p>
      </header>
      <form onSubmit={handleSubmit} className="mt-[40px] flex flex-col gap-4">
        <Input
          type="email"
          error={errors.email?.message}
          placeholder="E-mail"
          {...register("email")}
        />

      

        <PasswordInput
        
          type="password"
          error={errors.password?.message}
          placeholder="Senha"
          {...register("password")}
          />
       
         
        <Button type="submit" className="mt-2" isLoading={isLoading}>
          Entrar
        </Button>
        <ButtonOutlined onClick={() => navigate("/register")} className="mt-2">
          Cadastrar
        </ButtonOutlined>
        <div className="h-12">

        </div>
      </form>
    </>
  );
}
