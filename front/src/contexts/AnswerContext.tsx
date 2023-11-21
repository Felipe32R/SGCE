import { createContext, useState } from "react";

interface AnswerProps {
  answer: string;
  setAnswer: (answer: string) => void;
}

export const AnswerContext = createContext({} as AnswerProps);

export function AnswerProvider({ children }: any) {
  const [answer, setAnswer] = useState("");

  return (
    <AnswerContext.Provider value={{ answer, setAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}
