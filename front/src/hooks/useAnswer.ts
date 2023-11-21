import { useContext } from "react";
import { AnswerContext } from "../contexts/AnswerContext";

export function useAnswer() {
  return useContext(AnswerContext);
}