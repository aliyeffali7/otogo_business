import LoginLeft from "../../components/login/leftPart";
import LoginRight from "../../components/login/rightPart";

function Login() {
  return (
    <div className="flex justify-between min-h-screen">
      <LoginLeft />
      <LoginRight />
    </div>
  );
}

export default Login;
