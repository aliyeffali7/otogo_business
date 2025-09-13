// // layout/index.tsx
// import { Layout } from "antd";
// import React from "react";
// import Sidebar from "../components/main/sidebar";
// import { Outlet } from "react-router";

// const { Content, Sider } = Layout;

// const AppLayout: React.FC = () => {
//   return (
//     <Layout style={{ height: "100vh" }}>
//       <Sider
//         width={260}
//         style={{
//           background: "#14151b",
//           overflow: "hidden", 
//         }}
//       >
//         <Sidebar />
//       </Sider>

//       <Layout>
//         <Content
//           style={{
//             padding: 40,
//             backgroundColor: "#e1e2e8",
//             height: "100vh", // tam ekran boyu
//             overflowY: "auto", // sadece burada scroll olsun
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default AppLayout;
// layout/index.tsx
import { Layout } from "antd";
import React from "react";
import Sidebar from "../components/main/sidebar";
// DÜZGÜN import!
import { Outlet } from "react-router-dom";

const { Content, Sider } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }} className="font-sans">
      <Sider
        width={260}
        style={{
          background: "#14151b",
          overflow: "hidden",
        }}
        breakpoint="lg"
        collapsedWidth={80}
      >
        <Sidebar />
      </Sider>

      <Layout>
        <Content
          style={{
            padding: 40,
            backgroundColor: "#e1e2e8",
            // yalnız bir yerdə 100vh yazmaq bəs edir:
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
