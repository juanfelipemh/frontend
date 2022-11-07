import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/axios";

const ModificarProd = () => {
  let { id } = useParams();

  const [modif, setModif] = useState({
    nombre: " ",
    precio: 0,
    stock: 0
  });

  const [subId, setSubId] = useState(id);


  // Esto  captura los datos. Tener presente el "name" en el "formRecursoProduc"
  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setModif({ ...modif, [name]: value });
  };


  // Con esto se modifica el producto
  const actualizarProd = async (e) => {
    e.preventDefault();
    const newProd = {
      nombre: modif.nombre,
      precio: modif.precio,
      stock: modif.stock
    };
    Swal.fire(
      'Producto Actualizado!',
      'Presiona el botón regresar para ir al listado de productos!',
      'success'
    )
    await clienteAxios.put(
      "productos/modificarProducto/" + subId,
      newProd
    );
    setModif(" ");
    setSubId(" ");
  };

  // Esto lo que hace es obtener un solo producto, el que seleccionamos
  const obtUno = async (valorId) => {
    const res = await clienteAxios.get(
      "productos/consultarUnProducto/"+valorId
    );
    setModif({
      nombre: res.data.nombre,
      precio: res.data.precio,
      stock: res.data.stock
    });
  };

  // Acá se parametriza el id. Si es diferente a vacio, devuelve el valor
  useEffect(() => {
    if (subId !== "") {
      obtUno(subId);
    }
  }, [subId]);

  return (
    <>
      <div className="w-100">
        <form className="container">
          <h2 className="text-center mb-3">Actualizar Producto</h2>          
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresar el nombre"
              required
              name="nombre"
              value={modif.nombre}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-3">
            <label>Precio:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresar el precio"
              required
              name="precio"
              value={modif.precio}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Stock:</label>
            <input
              type="text"
              className="form-control"
              placeholder="ingresar el precio"
              required
              name="stock"
              value={modif.stock}
              onChange={capturarDatos}
            />
          </div>
          
        </form>
      </div>
      <div>
        <Link
          className="btn btn-danger form-control mt-2"
          onClick={actualizarProd}
          to={"/producto"}
        >
          Actualizar
        </Link>
      </div>
      <div>
        <Link className="btn btn-success form-control mt-2" to={"/producto"}>
          Regresar
        </Link>
      </div>
    </>
  );
};

export default ModificarProd;
