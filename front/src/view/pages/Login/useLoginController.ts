import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginParams, authService } from '../../../app/services/authService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().min(1,'E-mail é obrigatório.').email('Informe um e-mail válido.'),
  senha: z.string().min(1,'Senha é obrigatória.').min(8, 'Deve conter no mínimo 8 dígitos.'),
});

type FormData = z.infer<typeof schema>

export function useLoginController() {
  const { register, handleSubmit: hookFormHandleSubmit, formState: { errors } } = useForm<FormData>
  ({resolver: zodResolver(schema)});

  // const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginParams) => {
      return authService.login(data);
    },
  });

  const { signin } = useAuth()

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try{
    const { accessToken } =  await mutateAsync(data);

    signin(accessToken);
    }catch(err){
      toast.error(`Credenciais inválidas.`)
    }
  })

  return { handleSubmit, register, errors, isLoading }
}