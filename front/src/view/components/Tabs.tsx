import { useState } from "react";
import { Evaluations } from "../pages/Evaluations";


export default function Tabs() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>

      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-main border-b border-gray-light dark:border-gray-dark dark:text-gray-main mt-[-30px] mb-6">
        <li className="mr-2 cursor-pointer" onClick={() => handleTabClick(1)}>
          <div
            className={`inline-block p-4 rounded-t-lg dark:bg-gray-800 dark:text-blue-500 ${
              activeTab == 1 ? "text-green-main bg-gray-light rounded-t-lg" : ""
            }`}
          >
            NPS
          </div>
        </li>
        <li className="mr-2 cursor-pointer" onClick={() => handleTabClick(2)}>
          <div
            className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 ${
              activeTab == 2 ? "text-green-main bg-gray-light rounded-t-lg" : ""
            }`}
          >
            Avaliações
          </div>
        </li>
       
      </ul>
            


     

      {activeTab === 2 && <Evaluations />}



    </>
  );
}
