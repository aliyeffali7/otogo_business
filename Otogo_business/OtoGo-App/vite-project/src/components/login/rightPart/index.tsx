import { useState } from "react";
import { login } from "../../../services/auth";
import { useNavigate } from "react-router";
import { ROUTER } from "../../../constants/router";

function LoginRight() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await login({ phone, password });
      console.log("Login success:", response);

      localStorage.setItem("token", String(response.token));
      navigate(ROUTER.PROFILE);
    } catch (err) {
      console.error(err);
      setError("E-mail və ya şifrə yanlışdır.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[50%] bg-[#e1e2e8]">
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-[39px] font-medium text-[#1a1a1a] w-full">
          Login
        </h1>

        <div className="flex flex-col gap-2" style={{width: 450}}>
          <label htmlFor="email" className="text-sm text-[#1a1a1a]">
            Phone Number
          </label>
          <input
            id="email"
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-[450px] px-4 py-3 rounded-[10px] border border-[#c5c7d5] text-sm placeholder:text-[#b1b1b1] outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-[#1a1a1a]">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[450px] px-4 py-3 rounded-[10px] border border-[#c5c7d5] text-sm placeholder:text-[#b1b1b1] outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="mt-2 w-full py-3 bg-[#14151b] text-white rounded-[10px] text-sm tracking-wider hover:opacity-90 transition"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default LoginRight;
