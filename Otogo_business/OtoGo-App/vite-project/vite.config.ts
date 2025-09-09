// // import { defineConfig } from "vite";
// // import react from "@vitejs/plugin-react";
// // import tailwindcss from "@tailwindcss/vite";
// // // import vercel from 'vite-plugin-vercel';

// // // https://vite.dev/config/
// // // export default defineConfig({
// // //   plugins: [react(), tailwindcss()],
// // // });



// export default defineConfig({
//   plugins: [react(), tailwindcss()  ],
//   server: {
//     proxy: {
//       // API-lər backend-ə ötürülür
//       "/api": {
//         target: "http://194.163.173.179:3300",
//         changeOrigin: true,
//         secure: false,
//       },
//       // auth çağırışlarını da ötür (login/refresh/logout)
//       // "/auth": {
//       //   target: "http://194.163.173.179:3300",
//       //   changeOrigin: true,
//       //   secure: false,
//       // },
//     },
//   },
// });

// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // export default defineConfig({
// //   plugins: [react()],
// // })

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss";
// // https://vite.dev/config/

// export default defineConfig({
//   plugins: [react() , tailwindcss() ],
//   server: {
//     proxy: {
//       // API-lər backend-ə ötürülür
//       "/api": {
//         target: "http://194.163.173.179:3300",
//         changeOrigin: true,
//         secure: false,
//       },
//       // auth çağırışlarını da ötür (login/refresh/logout)
//       // "/auth": {
//       //   target: "http://194.163.173.179:3300",
//       //   changeOrigin: true,
//       //   secure: false,
//       // },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react(), ],
  server: {
    proxy: {
      "/api": {
        target: "http://194.163.173.179:3300",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}); 