import "./inicio.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
//import clienteAxios from "../../../config/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './inicio.css'

const Inicio = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSudmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/usuarios/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      // console.log(data);

      setAuth(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
        <img
          className="img-inicio "
          src="https://www.criteo.com/es/wp-content/uploads/sites/8/2019/01/action-active-activity-1103829.jpg"
        />

        <form>
          <div className="mx-3 my-3">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              id="input"
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mx-3 my-3">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Contraseña
            </label>
            <input
              type="password"
              id="input"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            onClick={handleSudmit}
            className="btn btn-primary"
            to="/"
          >
            Iniciar Sesion
          </Link>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link
              className="block text-center my-5 text-gray-500"
              to="/registrar"
            >
              ¿No tienes una cuenta? Registrate
            </Link>
          </nav>
          <nav>
            <Link
              className="block text-center my-5 text-gray-500"
              to="/olvide-password"
            >
              Olvide mi Password
            </Link>
          </nav>
        </form>
      </main>
    </>
  );
};

export default Inicio;
