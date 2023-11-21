import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { sgceService } from '../../../app/services/sgceService';


const schema = z.object({
  password: z.string().nonempty('Senha é obrigatória.').min(8, 'Deve conter no mínimo 8 dígitos.'),
  confirmPassword: z.string().nonempty('Senha é obrigatória.').min(8, 'Deve conter no mínimo 8 dígitos.'),


}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>

export function useResetPasswordController() {
  const { register, handleSubmit: hookFormHandleSubmit, formState: { errors } } = useForm<FormData>
  ({resolver: zodResolver(schema)});
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async (password: string) => {
      return sgceService.resetPassword({password, token});
    },
  });


  const handleSubmit = hookFormHandleSubmit(async (data) => {

    try{
       await mutateAsync(data.password);
      toast.success('Senha alterada com sucesso!')
      setTimeout(() => navigate('/login'),1000)
      }catch(err){
        toast.error(`Erro ao alterar senha.`)
      }

  })

  return { handleSubmit, register, errors, isLoading }
}