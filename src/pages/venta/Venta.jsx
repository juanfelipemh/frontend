import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./venta.css";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";
import clienteAxios from '../../../config/axios'

const Venta = () => {
  const [facturas, setFacturas] = useState([]);

  // Ver productos de factura
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Obtener todas las facturas registradas
  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const res = await clienteAxios.get(
          "/facturas/obtenerFacturas"
        );
        setFacturas(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerFacturas();
  }, []);


  return (
    <>
      <h2>Resumen de ventas - Administrador</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID Factura</th>
            <th scope="col">Fecha Compra</th>
            <th scope="col">Total Compra</th>
          </tr>
        </thead>
        {facturas.map((list, id) => (
          <tbody key={id}>
            <tr>
              <td>{list._id}</td>
              <td>{list.createdAt}</td>
              <td>{list.valorTotal}</td>
              <td>
                {list.items.map((item, id) => (
                  <tr key={id}>
                    <td className="border">Nombre: {item.nombre} - Precio: {item.precio} - Cantidad: {item.quantity}</td>
                  </tr>
                ))}
              </td>              
            </tr>
          </tbody>
        ))}
      </table>

    </>
  );
};

export default Venta;
