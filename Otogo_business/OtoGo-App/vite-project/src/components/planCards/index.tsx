import  { useState } from "react";

const plansData = [
  {
    title: "Beta plan - Store",
    features: [
      "50 product slot",
      "Visible on Otogo app as a Store",
    ],
    includes: "Includes:",
  },
  {
    title: "Beta plan - Service",
    features: [
      "20 product slot",
      "10 Professional accounts",
      "Visible on Otogo app as Service",
    ],
    includes: "Includes:",
  },
];

function PlanCards() {
  // 0: Store yuxarıda, 1: Service yuxarıda
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  const handleSwitch = () => {
    setCurrentPlanIndex(currentPlanIndex === 0 ? 1 : 0);
  };

  const currentPlan = plansData[currentPlanIndex];
  const otherPlan = plansData[1 - currentPlanIndex];

  return (
    <div className="max-w-md mt-[40px] min-h-screen font-sans">
      {/* Current Plan Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your plan:</h2>
        <div className="bg-gray-300 rounded-[37px] p-6 mb-6 w-[300px]">
          <h3 className="text-[28px] font-bold text-gray-800 mb-4">
            {currentPlan.title}
          </h3>
          <div className="text-gray-700">
            <p className="mb-2 text-[18px]">{currentPlan.includes}</p>
            <ul className="list-disc list-inside space-y-1 text-[18px]">
              {currentPlan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Other Plans Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Other plans:</h2>
        <div className="bg-gray-300 rounded-[37px] p-6 w-[300px]">
          <h3 className="text-[28px] font-bold text-gray-800 mb-4">
            {otherPlan.title}
          </h3>
          <div className="text-gray-700 mb-6">
            <p className="mb-2 text-[18px]">{otherPlan.includes}</p>
            <ul className="list-disc list-inside text-[18px]">
              {otherPlan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
          <button
            className="w-full bg-[#2C2F3A] hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            onClick={handleSwitch}
          >
            SWITCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanCards;