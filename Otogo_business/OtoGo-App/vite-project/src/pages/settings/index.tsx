// import React from 'react'



function Settings() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] bg-[#181920] rounded-2xl m-6 shadow-lg">
      <div className="flex flex-col items-center">
        {/* Animasiya - Spinner */}
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#A9ACBC] border-opacity-50 mb-8" />
        {/* Başlıq */}
        <h2 className="text-3xl font-bold text-white mb-3 text-center">
          Settings
        </h2>
        {/* Alt yazı */}
        <p className="text-lg text-[#A9ACBC] text-center">
          Bu hissə tezliklə aktiv olacaq.
        </p>
      </div>
    </div>
  );
}

export default Settings;
