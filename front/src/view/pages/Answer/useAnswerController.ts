import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import { sgceService } from "../../../app/services/sgceService";

import { useAnswer } from "../../../hooks/useAnswer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function validateFixPhoneNumber(phoneNumber: string | null) {
  if (phoneNumber == null) return true;
  // Remove caracteres não numéricos do telefone
  phoneNumber = phoneNumber.replace(/[^\d]+/g, "");
  // Verifica se o telefone possui 10 ou 11 dígitos (com DDD)
  return /^(\d{10,11})$/.test(phoneNumber);
}


const schema = z.object({
  justification: z.string().optional().or(z.literal("")),
  email: z.string().email('E-mail inválido.').optional().or(z.literal("")),
  telephone: z.string().refine((value) => validateFixPhoneNumber(value), {
    message: "Número inválido.",
  }).optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export function useAnswerController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { id, origin } = useParams();

  const { answer } = useAnswer();
  const navigate = useNavigate();

  const { data } = useQuery(["user", id], () =>
    sgceService.getUserById(Number(id))
  );
  const userData = data;

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["answer"],
    mutationFn: async (data: any) => {
      return sgceService.sendEvaluation(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {


    if(!answer){
      toast.error('Selecione uma nota para realizar a avaliação.')
      return
    }

    const evaluation = {
      ...data,
      value: answer || 0,
    };
    try {
      await mutateAsync({
        ...evaluation,
        questionId: 1,
        userId: id,
        origin: (origin === 'qrCode'|| origin === 'socialMedia') ? origin : 'qrCode'
      });
      toast.success("Avaliação enviada com sucesso!");
      navigate("/thanks", { state: { user: userData } });
    } catch {
      toast.error("Erro ao enviar avaliação.");
    }
  });

  return { handleSubmit, register, errors, isLoadingPost: isLoading };
}
