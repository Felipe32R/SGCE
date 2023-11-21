import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupParams, authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function validateCNPJ(cnpj: string) {
  // Remova quaisquer caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');

  // Verifique se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
      return false;
  }

  // Verifique se o CNPJ não é uma sequência de dígitos iguais
  if (/^(\d)\1{13}$/.test(cnpj)) {
      return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso--;
      if (peso < 2) {
          peso = 9;
      }
  }
  var digito1 = 11 - (soma % 11);
  if (digito1 > 9) {
      digito1 = 0;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso--;
      if (peso < 2) {
          peso = 9;
      }
  }
  var digito2 = 11 - (soma % 11);
  if (digito2 > 9) {
      digito2 = 0;
  }
  return  parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2;
}

function validateFixPhoneNumber(phoneNumber: string | null) {
  if (phoneNumber == null) return true;
  // Remove caracteres não numéricos do telefone
  phoneNumber = phoneNumber.replace(/[^\d]+/g, "");
  // Verifica se o telefone possui 10 ou 11 dígitos (com DDD)
  return /^(\d{10})$/.test(phoneNumber);
}

function validatePhoneNumber(phoneNumber: string | null) {
  if (phoneNumber == null) return true;
  // Remove caracteres não numéricos do telefone
  phoneNumber = phoneNumber.replace(/[^\d]+/g, "");
  // Verifica se o telefone possui 10 ou 11 dígitos (com DDD)
  return /^(\d{11})$/.test(phoneNumber);
}


const schema = z
  .object({
    name: z.string().nonempty("Nome é obrigatório."),
    nameCompany: z.string().nonempty("Nome da empresa é obrigatório."),
    email: z
      .string()
      .nonempty("E-mail é obrigatório.")
      .email("Informe um e-mail válido."),
    password: z
      .string()
      .nonempty("Senha é obrigatória.")
      .min(8, "Deve conter no mínimo 8 dígitos."),
    confirmPassword: z
      .string()
      .nonempty("Senha é obrigatória.")
      .min(8, "Deve conter no mínimo 8 dígitos."),
    cnpj: z
      .string()
      .nonempty("CNPJ é obrigatório.")
      .refine((value) => validateCNPJ(value), { message: "CNPJ inválido." }),
    type: z.string().nonempty("Ramo de atuação é obrigatório."),
    telephone: z
      .string()
      .refine((value) => validateFixPhoneNumber(value), {
        message: "Número inválido.",
      }).optional().or(z.literal("")),
    cellphone: z
      .string()
      .nonempty("Número de celular é obrigatório.")
      .refine((value) => validatePhoneNumber(value), {
        message: "Número inválido.",
      }),
    termsAndConditions: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
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
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    if (!data.termsAndConditions) {
      toast.error("Aceite os termos e condições de uso para prosseguir.");
      return;
    }

    const cnpj = data.cnpj.replace(/[^\d]/g, "");

    try {
      await mutateAsync({
        ...data,
        cnpj,
      });
      toast.success("Conta criada com sucesso!");
      navigate("/login");
    } catch (err) {

      toast.error(`Erro ao criar conta.`);
    }
  });

  return { handleSubmit, register, errors, isLoading };
}
