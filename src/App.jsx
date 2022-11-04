import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

// Context
import { AuthProvider } from "./context/AuthProvider";
import { UsuariosProvider } from "./context/UsuariosProvider";

// Layout
import Layout from "./components/layout/Layout";
import RutaProtegida from "./components/layout/RutaProtegida";

// Pages
import Inicio from "./pages/inicio/Inicio";
import Carrito from "./pages/carrito/Carrito";
import Producto from "./pages/producto/Producto";
import Venta from "./pages/venta/Venta";
import ModificarProd from "./pages/modificar/ModificarProd";
import Compras from "./pages/compras/Compras";

// usuarios
import Registrar from "./pages/usuarios/Registrar";
import ConfirmarCuenta from "./pages/usuarios/confirmarCuenta";
import OlvidePassword from './pages/usuarios/OlvidePassword';
import NuevoPassword from './pages/usuarios/NuevoPassword';
import AdministrarUsuarios from './pages/usuarios/AdministrarUsuarios';
import EditarPerfil from './pages/usuarios/EditarPerfil';
import CambiarPassword from './pages/usuarios/CambiarPassword';

function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <UsuariosProvider>
          {/* Rutas Publicas */}
          <Routes>
            <Route path="/" element={<Layout />}>       
            <Route path="inicio" element={<Inicio />} />       
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
            </Route>

            {/* Rutas Protegidas */}
            <Route path="/" element={<RutaProtegida />}>
            <Route index element={<AdministrarUsuarios/>} />
              <Route path="modificar/:id" element={<ModificarProd />} />              
              <Route path="perfil" element={<EditarPerfil/>} />            
              <Route path="cambiar-password" element={<CambiarPassword/>} />
              <Route path="producto" element={<Producto />} />
              <Route path="carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
              <Route path="compras" element={<Compras carrito={carrito} setCarrito={setCarrito} />} />
              <Route path="venta" element={<Venta />} />
            </Route>
          </Routes>
        </UsuariosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
