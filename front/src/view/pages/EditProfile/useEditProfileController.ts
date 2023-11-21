import { useMutation, useQuery } from "@tanstack/react-query";
import { sgceService } from "../../../app/services/sgceService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { z } from "zod";
import { localStorageKeys } from "../../../config/localStorageKeys";



function validatePhoneNumber(phoneNumber: string | null) {
  if (phoneNumber == null) return true;
  // Remove caracteres não numéricos do telefone
  phoneNumber = phoneNumber.replace(/[^\d]+/g, "");
  // Verifica se o telefone possui 10 ou 11 dígitos (com DDD)
  return /^(\d{10}|\d{11})$/.test(phoneNumber);
}

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório."),
  nameCompany: z.string().nonempty("Nome da empresa é obrigatório."),
  type: z.string().nonempty("Ramo de atuação é obrigatório."),
  telephone: z
    .string()
    .refine((value) => validatePhoneNumber(value), {
      message: "Número inválido.",
    })
    .or(z.literal("")),
  cellphone: z
    .string()
    .nonempty("Número de celular é obrigatório.")
    .refine((value) => validatePhoneNumber(value), {
      message: "Número inválido.",
    }),
});
type FormData = z.infer<typeof schema>;

export function useEditProfileController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["editProfile"],
    mutationFn: async (data: any) => {
      return sgceService.editUser(user?.id,data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {

    if(user)
    setUser({id: user?.id, ...data, email: user?.email, cnpj: user?.cnpj})
    try {
      await mutateAsync({
        ...data,
      });
      toast.success("Edição feita com sucesso!");
      localStorage.setItem(localStorageKeys.USER, JSON.stringify({...data, id: user?.id}))
      navigate(-1);
    } catch (err) {

      toast.error(`Erro ao editar conta.`);
    }
  });

  return { handleSubmit, register, errors, isLoadingEdit: isLoading };
}


export function useGetMainActivitys() {
  const {data, isLoading } = useQuery({
    queryKey: ['getMainActivitys'],
    queryFn: async () => {
      return sgceService.getMainActivitys();
    }
  })

  return { mainActivitys: data, isLoading };
}
