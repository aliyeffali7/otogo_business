// // // import React from "react";

// function LoginLeft() {
//   return (
//     <div className="bg-[#14151b] flex justify-center items-center w-[50%]">
//       <div className="flex flex-col  leading-[0.9]">
//         <span className="text-[#fff] text-right text-[69px]  font-medium">
//           OTOGO
//         </span>
//         <span className="text-[#fff] text-[69px] font-medium">BUSINESS</span>
//       </div>
//     </div>
//   );
// }

// export default LoginLeft;


function LoginLeft() {
  return (
    <div className="bg-[#14151b] flex justify-center items-center w-full sm:w-1/2 min-h-[220px] sm:min-h-screen py-10 sm:py-0">
     <div className="flex flex-col gap-y-4 leading-tight px-2">
  <span className="text-[#fff] text-right text-4xl sm:text-[69px] font-medium">
    OTOGO
  </span>
  <span className="text-[#fff] text-4xl sm:text-[69px] font-medium">
    BUSINESS
  </span>
</div>
    </div>
  );
}

export default LoginLeft;