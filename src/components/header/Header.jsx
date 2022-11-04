import React from "react";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import "./header.css";

const Header = () => {
  const { auth, cerrarSesion } = useAuth();
  const { usuario } = auth;

  return (
    <>
      <header>
        <h1>TIENDA DEPORTIVA DW4</h1>
        <nav className="menu-nav">
          <Link className="menu-nav__item" to="inicio">
            Inicio
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;

/* 
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
          <Link className="menu-nav__item" to="registrar">
            Registrar
          </Link>
*/