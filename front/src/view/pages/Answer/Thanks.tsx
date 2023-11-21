import { useLocation } from 'react-router-dom';
import { User } from '../../../app/services/authService';
import loginIlustraiton from '../../../assets/loginIlustration.svg';
import avalieMe from '../../../assets/avalieMe.png';

interface LocationState {
  user: User;
}

export function Thanks() {
  const location = useLocation();
  const locationState = location.state as LocationState;
  const { user } = locationState;

  return (
    <div className="flex w-full h-full">
      <div
        className={`bg-green-light w-full h-full lg:w-1/2  ${
          location.pathname === '/register' && '!w-full'
        }  flex items-center justify-center flex-col`}
      >
        <img src={avalieMe} className="md:h-12 h-8" />

        <div
          className={`md:mt-6 w-full max-w-[570px] md:px-8 px-4 mt-3  ${
            location.pathname === '/register' && 'max-w-[800px]'
          }`}
        >
          <header className="flex-col justyfy-center gap-6  text-green-main text-center">
            <strong className=" text-xl">{user.nameCompany}</strong>
            <p className="text-center mt-4">
              Estamos constantemente buscando o melhor para o nosso
              estabelecimento, e é você quem mais irá nos ajudar para que seja
              sempre possível novas melhorias. <br /> Por isso, agradecemos a
              sua avaliação e esperamos te encontrar novamente.
            </p>
          </header>
        </div>
      </div>
      <div
        className={`bg-blue-500  w-1/2  h-full hidden lg:flex justify-center items-center p-8  ${
          location.pathname === '/register' && '!hidden'
        }`}
      >
        <img
          src={loginIlustraiton}
          className={`w-full h-full max-w-[656] max-h-[950px]  ${
            location.pathname === '/register' && 'hidden'
          }`}
        />
      </div>
    </div>
  );
}
