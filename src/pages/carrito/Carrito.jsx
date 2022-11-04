import { useEffect, useState } from "react";
import "./carrito.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Carrito = ({ carrito, setCarrito }) => {
 

  const TotalSuma = () => {
    return carrito.reduce(
      (suma, { precio, quantity }) => suma + precio * quantity,
      0
    );
  };

  const limpiarCarro = () => {
    setCarrito([]);
  };

  
  const setCantidad = (producto, total) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.find((item) => item.nombre === producto.nombre).quantity = total
    setCarrito(nuevoCarrito);
  };

  const removerdelCarrito = (productoRemovido) => {
    setCarrito(carrito.filter((producto) => producto != productoRemovido));
  };

  const finalizarCompra = async () => {
    try {
      const nuevaFactura = {     
        valorTotal: TotalSuma(),
        items: [...carrito]       
      };      
      
      await axios.post("http://localhost:5000/api/facturas/agregarFacturas", nuevaFactura)
      
      Swal.fire(
        'Compra relizada!',
        'Pronto recibirás tus productos!',
        'success'        
      );       

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <h2>Carrito de compras - Clientes</h2>

      <div>
        <button id="crear" className="btn btn-danger" onClick={limpiarCarro}>Limpiar carrito</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        { carrito.map( (producto) => (
          <tbody key={producto._id}>
            <tr>
              <td><img src={producto.imagen} alt={producto.nombre} width="50" /></td>
              <td>{producto._id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>
                <input value={producto.quantity || 0}
                onChange={(e) => setCantidad(producto, parseInt(e.target.value))} />
              </td>    
              <td>
                <button className="btn btn-danger" onClick={() => removerdelCarrito(producto)}>Quitar</button>
              </td>           
            </tr>
          </tbody>
        ))}
      </table>

      <div className="costo">Costo Total </div>
      <div className="valor">$ {TotalSuma() || 0}</div>

      <Link id="comprar" className="btn btn-success" onClick={ ()=> {{finalizarCompra(), limpiarCarro()}}}>Comprar</Link>
    </>
  );
};

export default Carrito;
