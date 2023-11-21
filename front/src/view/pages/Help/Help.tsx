

import React, { useRef, useState } from 'react';

export function Help() {

  const [selected, select] = useState('Sobre o Avalie-me');
  const ref = useRef<HTMLDivElement>();

  const sideOptions = [
    'Sobre o Avalie-me',
    'O que é NPS?',
    'Como calcular o NPS',
    'Validade dos resultados do NPS',
  ];

  const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop <=
      event.currentTarget.offsetHeight
    )
      return select('Validade dos resultados do NPS');
    select(
      (
        [...Array.from(event.currentTarget.childNodes.values())].filter(
          (child) =>
            (child as HTMLDivElement).getBoundingClientRect().y +
              (child as HTMLDivElement).getBoundingClientRect().height / 4 >=
            0
        )[0] as HTMLDivElement
      ).id
    );
  };

  return (
    <div className="flex gap-12 h-full">
      <div
        className="w-4/5 h-full overflow-y-scroll scroll-smooth pr-3 custom-scroll"
        onScroll={onScroll}
        ref={ref as any}
      >
        <div className="mb-14 text-gray-lightdark" id="Sobre o Avalie-me">
          <h1 className="text-4xl text-green-main mb-6">Sobre o Avalie-me</h1>
          <p className="mb-3">
            O Avalie-me é um serviço criado pela Abrasel para que os
            estabelecimentos de alimentação fora lar possam obter avaliações de
            seus clientes para melhorar cada vez mais o atendimento.
          </p>
          <p>
            O Avalie-me baseia-se numa metodologia de pesquisa de mercado
            conhecida como NPS, já validade e consagrada mundialmente, utilizada
            por milhares de empresas de todos os setores, especialmente as que
            têm relacionamento direto com o consumidor.
          </p>
        </div>
        <div className="mb-14 text-gray-lightdark" id="O que é NPS?">
          <h1 className="text-4xl text-green-main mb-6">O que é NPS?</h1>
          <p className="mb-3">
            É a sigla de Net Promoter Score, um método que se propõe a avaliar a
            fidelidade dos clientes de qualquer empresa através da resposta a
            uma única pergunta:
          </p>
          <p className="mb-3 font-semibold">
            “De 0 a 10, quanto você recomenda este estabelecimento a um amigo,
            colega ou familiar?”
          </p>
          <p className="mb-3">
            Pode ser feita mais uma pergunta, para saber o motivo:
          </p>
          <p className="mb-5 font-semibold">
            “Por que você deu esta resposta?”
          </p>
          <h4 className="text-xl text-green-main mb-2 font-semibold">
            Classificações do NPS
          </h4>
          <div className="ml-5">
            <p className="mb-3">
              Pelas notas que deram, seus clientes são classificados em três
              faixas:
            </p>
            <h5 className="text-lg text-green-main mb-2">
              <span className="font-semibold">Clientes Detratores</span> |{' '}
              <span className="text-sm">Notas: 0 a 6</span>
            </h5>
            <p className="ml-5 mb-5">
              São aqueles que avaliam negativamente seu produto ou serviço,
              dificilmente o utilizariam novamente, e podem chegar a falar mal e
              até “desrecomendar” seu estabelecimento a outras pessoas.
            </p>
            <h5 className="text-lg text-green-main">
              <span className="font-semibold">Clientes Neutros</span> |{' '}
              <span className="text-sm">Notas: 7 e 8</span>
            </h5>
            <p className="ml-5 mb-5">
              São os ficaram satisfeitos, mas em um nível que não é suficiente
              para fazê-los retornar, recomendar o estabelecimento ou se
              tornarem clientes fiéis.
            </p>
            <h5 className="text-lg text-green-main">
              <span className="font-semibold">Clientes Promotores</span> |{' '}
              <span className="text-sm">Notas: 9 e 10</span>
            </h5>
            <div className="ml-5">
              <p>
                São clientes que ficaram muito satisfeitos com seu
                estabelecimento e falam bem, elogiam, recomendam, tornam-se
                fiéis. Enfim, atuam como verdadeiros promotores de sua marca.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-14 text-gray-lightdark" id="Como calcular o NPS">
          <h1 className="text-4xl text-green-main mb-6">Como calcular o NPS</h1>
          <p className="mb-3">
            O passo a passo para calcular o NPS é o seguinte:
          </p>
          <ul className="list-inside list-decimal ml-10">
            <li className="mb-3 marker:font-semibold">
              Sobre o total de clientes que avaliaram, calculam-se os
              percentuais de clientes detratores, de clientes neutros e de
              clientes promotores.
            </li>
            <li className="marker:font-semibold marker:mr-5">
              <p className="inline">
                A diferença entre os percentuais de promotores e detratores (os
                neutros não entram na conta), escrita sem o símbolo de
                percentual, é o seu NPS.
              </p>
              <p className="font-semibold mt-3">Por exemplo: </p>
              <ul className="list-inside list-disc ml-10 mb-3">
                <li>Promotores: 60%</li>
                <li>Detratores: 20%</li>
                <li>Cálculo do NPS: 60 - 20 = 40</li>
              </ul>
              <ul className="list-inside list-disc ml-10 mb-3">
                <li>Promotores: 30%</li>
                <li>Detratores: 40%</li>
                <li>Cálculo do NPS: 30 - 40 = -10</li>
              </ul>
              <ul className="list-inside list-disc ml-10 mb-3">
                <li>Promotores: 50%</li>
                <li>Detratores: 50%</li>
                <li>Cálculo do NPS: 50 - 50 = 0</li>
              </ul>
              <ul className="list-inside list-disc ml-10 mb-3">
                <li>Promotores: 0%</li>
                <li>Detratores: 60%</li>
                <li>Cálculo do NPS: 0 - 60 = -60</li>
              </ul>
            </li>
          </ul>
          <p>
            Como você já deve ter percebido, o NPS pode variar de -100 a 100.
            Quanto maior o NPS, maior é a presença de promotores e, à medida em
            que diminui, aumenta a de detratores. A faixa em que o seu NPS se
            encontra auxilia a traçar estratégias para melhorar a retenção de
            clientes.
          </p>
        </div>
        <div
          className="mb-14 text-gray-lightdark"
          id="Validade dos resultados do NPS"
        >
          <h1 className="text-4xl text-green-main mb-6">
            Validade dos resultados do NPS
          </h1>
          <p className="mb-3">
            Uma dúvida que pode aparecer é: a partir de quantas respostas ao NPS
            posso considerar o resultado como válido?
          </p>
          <p>
            Quanto mais, melhor. Lembre-se que o NPS é uma pesquisa de mercado à
            qual se aplicam critérios estatísticos, em que a quantidade de
            entrevistas está diretamente relacionada à precisão dos resultados.
            Mas, e o mínimo? A rigor, a partir de 100 resultados. Mas não
            despreze quantidades menores, pois 30, 40 respostas, por exemplo, já
            podem dar indicativos importantes, especialmente se vierem
            acompanhadas dos motivos. Que, aliás, são importantíssimos e devem
            ser estudados com toda a atenção. Verifique, também, um intervalo de
            tempo. Pode ser valioso para descobrir problemas pontuais que estão
            acontecendo ou que aconteceram.
          </p>
        </div>
      </div>
      <div className="w-1/5 h-full text-gray-main">
        <div className="w-full border-l-4 border-l-green-border pt-2 pb-1 pl-5 text-sm font-bold">
          O que você procura?
        </div>
        {sideOptions.map((item) => (
          <a
            href={'#' + item}
            className={`w-full block pt-1 pb-1 border-l-4 border-l-green-border pl-5 text-sm ${
              selected == item
                ? 'text-green-main font-semibold'
                : 'hover:text-green-hover'
            } cursor-pointer`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
