import { ArrowUDownLeft } from "phosphor-react"
import { useNavigate } from "react-router-dom"


function ReturnButton() {

  const navigate = useNavigate();

  return (
    <button className="rounded-[50%] absolute top-[14%] left-10 text-blue-dark" onClick={() => navigate(('/'),{state: {returnValue: true}})}><ArrowUDownLeft size={34} /></button>
  )
}

export default ReturnButton