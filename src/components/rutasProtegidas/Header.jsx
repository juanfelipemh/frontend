import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./header.css"

const Header = () => {
  const { auth, cerrarSesion } = useAuth();
  const { usuario } = auth;

  return (
    <>
      <header>
        <h1>TIENDA DEPORTIVA DW4</h1>

        {usuario?._id ? (
          <h4 className="text-white font-black text-sm uppercase">Bienvenido {usuario.nombre}
          </h4>
        ) : (
          <h4 className="text-white font-black text-sm uppercase">Sesión finalizada</h4>
        )}
        {usuario?._id ? (
          <h4 className="text-white font-black text-sm uppercase">Correo: {usuario.email}
          </h4>
        ) : (
          <h4 className="text-white font-black text-sm uppercase"></h4>
        )}

        <nav className="menu-nav">          
          <Link className="menu-nav__item" to="producto">
            Lista Productos
          </Link>
          <Link className="menu-nav__item" to="compras">
            Productos
          </Link>
          <Link className="menu-nav__item" to="carrito">
            Carrito de Compras
          </Link>
          <Link className="menu-nav__item" to="venta">
            Lista de Ventas
          </Link>
          <Link
            className="menu-nav__item"
            to="inicio"
            onClick={cerrarSesion}>
            Cerrar Sesion
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
