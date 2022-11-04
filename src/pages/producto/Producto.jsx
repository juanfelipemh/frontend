import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { productoInputs } from "../../formRecursoProduc";
import "./producto.css"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";



const Producto = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({});

  /* Esto hace que al momento de crear un producto, aparece la ventana flotante  */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*  OBTENER PRODUCTOS
    =======================

  Con esta función obtenemos todos los datos de la bas de datos. 
  */
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

  /*   CREACIÓN DE UN PRODUCTO
      ==========================

  A continuación se crea el código para crear un producto nuevo. Con el "handleChange", controla que los cambios en el
  formulario al momento de ingresar datos, sean validos. Importante saber que el "formRecursoProduct.js" contiene los elementos
  que revisaría incluiría el formulario, es por esta razón, que no es necesario agregar cada etiqueta, sino que se construye
  automáticamente tomando ese recurso creado.

  El "map(input)" permite control el ingreso de cada dato, además dependiendo de la estructura asignada en el "formRecursoProduct.js"

  el "key='input.id" es la clave que toma para crear el producto. Siempre se debe agregar a la etiqueta para que identifique
  cuál es el formulario a manejar

  Se manejo un hook que sería [nuevoProducto, setNuevoProducto] = useState({}), el cual se encarga de almacenar el dato y
  luego se registrar en la base de datos

  Con el "handleClick" lo que hacemos es que, una vez capturas los datos y almacenados en el useState "nuevoProducto", considerando que los datos ya fueron capturados en el "handleChange", y agregados al hook useState "setNuevoProducto"

  el {...nuevoProducto}, lo que trae son los datos capturados (no es necesario poner "nombre", "precio", "imagen"). con este método trae todo lo parametrizado acá
  */
  const handleChange = (e) => {
    setNuevoProducto((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const productoNuevo = { ...nuevoProducto };
      await axios.post(
        "http://localhost:5000/api/productos/agregarProducto",
        productoNuevo
      );
      if (handleClick) {
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*   ELIMINAR UN PRODUCTO
    ============================

  Tener presente que para eliminar un producto, se debe enviar el "id" de este como parámetro. Se implemente el método de axios, pero se debe tener cuidado, porque si no ponemos una validación previamente, elimina un dato. En este caso se aplicó un "sweetalert", el cual es una ventana que se muestra antes de ejecutar la función "axios.delete". 
  */
  const eliminarProducto = async (id) => {
    try {
      await Swal.fire({
        title: "Está seguro?",
        text: "Una vez eliminado no podrá reversarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(
            "http://localhost:5000/api/productos/eliminarProducto/" + id
          );
          Swal.fire("Eliminado!", "El producto ha sido eliminado", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* MODIFICAR PRODUCTO */

  return (
    <>
      <h2>Lista Productos - Administardor</h2>
      
      <button id="crear" className="btn btn-primary" onClick={handleShow}>
        Nuevo Producto
      </button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          {productoInputs.map((input) => (
            <form>
              <div class="form-group" key={input.id}>
                <label>{input.label}</label>
                <input
                  class="form-control"
                  id={input.id}
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                />
              </div>
            </form>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleClick}>
            Grabar
          </button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        {productos.map((list) => (
          <div className="col-md-4 p-2" key={list._id}>
            <div className="card">
              <div className="card-header">
                <h5>{list.nombre}</h5>
              </div>
              <div className="card-body">
                <img src={list.imagen} alt={list.nombre} srcset="" width="50" />
                <h6>Precio: {list.precio}</h6>
                <h6>Cantidad Disponible: {list.stock}</h6>
                <h6>ID: {list._id}</h6>
              </div>

              <div className="card-footer">
                <button
                  className="btn btn-danger text-dark"
                  onClick={() => eliminarProducto(list._id)}
                >
                  Eliminar
                </button>
                <Link
                  className="btn btn-primary m-1"
                  to={`/modificar/${list._id}}`}
                >
                  Modificar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Producto;
