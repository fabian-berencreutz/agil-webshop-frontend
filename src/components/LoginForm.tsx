import { useState } from "react";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <input
        type="email"
        placeholder="E-post"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded-lg m-1 p-1"
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-lg m-1 p-1"
      />
      <button type="submit" className="border rounded-lg m-1 p-1 cursor-pointer bg-slate-600 hover:bg-slate-800 text-white">Logga in</button>
    </form>
  );
};
export default LoginForm;
