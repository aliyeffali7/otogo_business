
function PlanCards() {
  return (
    <div className="max-w-md  mt-[40px] min-h-screen">
      {/* Current Plan Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your plan:</h2>
        
        <div className="bg-gray-300 rounded-[37px] p-6 mb-6 w-[300px]">
          <h3 className="text-[28px] font-bold text-gray-800 mb-4">Beta plan - Store</h3>
          
          <div className="text-gray-700">
            <p className="mb-2  text-[18px]">Includes:</p>
            <ul className="list-disc list-inside space-y-1 text-[18px]">
              <li>50 product slot</li>
              <li>Visible on Otogo app as a Store</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Other Plans Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Other plans:</h2>
        
        <div className="bg-gray-300 rounded-[37px] p-6 w-[300px]">
          <h3 className="text-[28px] font-bold text-gray-800 mb-4">Beta plan - Service</h3>
          
          <div className="text-gray-700 mb-6">
            <p className="mb-2 text-[18px]">Includes:</p>
            <ul className="list-disc list-inside  text-[18px]">
              <li>20 product slot</li>
              <li>10 Professional accounts</li>
              <li>Visible on Otogo app as Service</li>
            </ul>
          </div>
          
          <button className="w-full bg-[#2C2F3A] hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 ">
            SWITCH
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanCards;