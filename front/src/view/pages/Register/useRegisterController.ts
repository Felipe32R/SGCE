import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";




const schema = z
  .object({
    nome: z.string().min(1,"Nome é obrigatório."),
    partido: z.string().min(1,"Sigla do partido é obrigatório."),
    email: z
      .string()
      .min(1,"E-mail é obrigatório.")
      .email("Informe um e-mail válido."),
    senha: z
      .string()
      .min(1,"Senha é obrigatória.")
      .min(8, "Deve conter no mínimo 8 dígitos."),
    confirmarSenha: z
      .string()
      .min(1,"Senha é obrigatória.")
      .min(8, "Deve conter no mínimo 8 dígitos."),
    cargoId: z.string().min(1,"Selecione um cargo."),
    numero: z.string().min(1,"Número é obrigatório.").refine(data => !isNaN(Number(data)), {
    message: 'O campo deve ser um número válido',
  }),

    termsAndConditions: z.boolean(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas não conferem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: any) => {
      delete data.termsAndConditions;
      delete data.confirmarSenha;
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    if (!data.termsAndConditions) {
      toast.error("Aceite os termos e condições de uso para prosseguir.");
      return;
    }


    try {
      await mutateAsync({
        ...data,
        numero: Number(data.numero)
      });
      toast.success("Conta criada com sucesso!");
      navigate("/registerCampaign");
    } catch (err) {

      toast.error(`Erro ao criar conta.`);
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
