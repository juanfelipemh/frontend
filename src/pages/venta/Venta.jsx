import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./venta.css";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";

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
        const res = await axios.get(
          "http://localhost:5000/api/facturas/obtenerFacturas"
        );
        setFacturas(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerFacturas();
  }, []);

  const { items } = facturas;

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
        {facturas.map((list) => (
          <tbody key={list._id}>
            <tr>
              <td>{list._id}</td>
              <td>{list.createdAt}</td>
              <td>{list.valorTotal}</td>
              <td>
                <Button variant="primary" onClick={handleShow}>
                  Ver Productos
                </Button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>            
              <tbody>
                <tr>
                  <td>Nombre</td>
                  <td>Cantidad</td>
                  <td>Valor Unitario</td>
                  <td>Total</td>
                </tr>
              </tbody>            
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Venta;
