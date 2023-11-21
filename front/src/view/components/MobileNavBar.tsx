import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import avalieMeWhite from '../../assets/avalieMe-white.png';
import { ChartLine, List, Question, Scan, User, XCircle } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface MobileNavBarProps {
  setActivePage: Dispatch<SetStateAction<number>>;
  activePage: number;
}

export default function MobileNavBar({
  activePage,
  setActivePage,
}: MobileNavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { signout } = useAuth();

  const handlePageChange = useCallback(
    (pageNumber: number, route: string) => {
      setActivePage(pageNumber);
      navigate(`${route}`);
      setIsMenuOpen(false);
    },
    [navigate, setActivePage]
  );

  return (
    <nav className="md:hidden block w-full transition-all">
      <div className="flex justify-between items-center w-full h-14 bg-green-main px-4">
        <img
          src={avalieMeWhite}
          className="w-[22%]"
          onClick={() => handlePageChange(0, '/nps/presentation')}
        />
        {isMenuOpen ? (
          <XCircle
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white-main"
            size={32}
          />
        ) : (
          <List
            size={32}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white-main"
          />
        )}
      </div>
      {isMenuOpen && (
        <div className="flex flex-col w-full  absolute transition-all ">
          <ul className="text-center bg-green-main text-white-main p-3 text-lg font-normal rounded-b-md !z-[999]">
            <li
              className={`flex items-center gap-2 justify-center p-2  ${
                activePage == 1 && 'bg-green-lighter rounded-md'
              }`}
              onClick={() => handlePageChange(1, '/nps')}
            >
              <ChartLine size={28} /> Meu NPS
            </li>
            <li
              className={`flex items-center gap-2 justify-center p-2  ${
                activePage == 2 && 'bg-green-lighter  rounded-md'
              }`}
              onClick={() => handlePageChange(2, '/qrcode')}
            >
              <Scan size={28} /> QR Code
            </li>
            <li
              className={`flex items-center gap-2 justify-center p-2  ${
                activePage == 3 && 'bg-green-lighter  rounded-md'
              }`}
              onClick={() => handlePageChange(3, '/')}
            >
              <User size={28} /> Meus dados
            </li>
            <li
              className={`flex items-center gap-2 justify-center p-2  ${
                activePage == 4 && 'bg-green-lighter  rounded-md'
              }`}
              onClick={() => handlePageChange(4, '/nps/presentation')}
            >
              <Question size={28} /> Ajuda
            </li>
            <li
              className=" cursor-pointer w-full pl-4 p-2 text-white-main mt-6"
              onClick={signout}
            >
              Sair
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
