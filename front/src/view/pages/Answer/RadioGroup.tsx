import { useAnswer } from "../../../hooks/useAnswer";

interface CustomRadioButtonProps {
  id: string;
}

function CustomRadioButton({ id }: CustomRadioButtonProps) {
  const { setAnswer } = useAnswer();

  return (
    <div onClick={() => setAnswer(id)}>
      <input
        type="radio"
        name="option"
        id={id}
        value={id}
        className="peer hidden"
        // defaultChecked={id == "0" ? true : false}
      />
      <label
        htmlFor={id}
        className="text-green-main w-full block cursor-pointer select-none rounded-lg px-4 lg:px-2 py-0 border-green-main border-2 text-center peer-checked:bg-green-main peer-checked:font-bold peer-checked:text-white-main"
      >
        {id}
      </label>
    </div>
  );
}

export default function RadioGroup() {
  return (
    <main className="w-full  place-items-center">
      <div className=" justify-center w-full flex items-center gap-2 rounded-xl  p-2 flex-wrap">
        <CustomRadioButton id={"0"} />
        <CustomRadioButton id={"1"} />
        <CustomRadioButton id={"2"} />
        <CustomRadioButton id={"3"} />
        <CustomRadioButton id={"4"} />
        <CustomRadioButton id={"5"} />
        <CustomRadioButton id={"6"} />
        <CustomRadioButton id={"7"} />
        <CustomRadioButton id={"8"} />
        <CustomRadioButton id={"9"} />
        <CustomRadioButton id={"10"} />
      </div>
    </main>
  );
}
