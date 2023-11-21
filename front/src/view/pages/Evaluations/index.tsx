import { Loader } from "../../components/Loader";
import { Table } from "./Table";
import { useEvaluationController } from "./useEvaluationController";

export function Evaluations() {
  const { evaluations, isLoading } = useEvaluationController();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full">

      <Table evaluations={evaluations} />
    </div>
  );
}
