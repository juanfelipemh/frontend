import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const Compras = ({ carrito, setCarrito }) => {
  const [productos, setProductos] = useState([]);
  

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/productos/consultarProductos"
        ); // PROBLEMA CON EL CORS - SE SOLUCIONÓ INSTALANDO UNA EXTENSIÓN EN CHROME O NPM CROS
        setProductos(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    obtenerProductos();
  }, [productos]);

  const adicionarCarrito = (producto) => {
    let nuevoCarrito = [...carrito];
    let itemCarrito = nuevoCarrito.find(
      (item) => producto.nombre === item.nombre
    );    


    if (itemCarrito) {
        itemCarrito.quantity++;          
      }  else {
      itemCarrito = {
        ...producto,
        quantity: 1,
      }; 
      nuevoCarrito.push(itemCarrito);     
    }    
    setCarrito(nuevoCarrito);
  };

  return (
    <>
    <h2>Artículos de la tienda - Cliente</h2>

    <Link className="btn btn-info m-lg-3" to="/carrito">Ir al carrito de compras </Link>  

    <div className="row">
      {productos.map((producto) => (
        <div className="col-md-4 p-2" key={producto._id}>
          <div className="card">
            <div className="card-header">
              <h5>{producto.nombre}</h5>
            </div>
            <div className="card-body">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                srcset=""
                width="50"
              />
              <h6>Precio: {producto.precio}</h6>
              <h6>Cantidad Disponible: {producto.stock}</h6>
              <h6>ID: {producto._id}</h6>
            </div>

            <div className="card-footer">
              <button
                className="btn btn-success text-white"
                onClick={() => {adicionarCarrito(producto)}}
              >
                Seleccionar
              </button>
              
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );  
};

export default Compras;
