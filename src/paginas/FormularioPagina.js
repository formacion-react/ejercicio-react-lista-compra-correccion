import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Info } from "../componentes/Info";
import { ArticulosContext } from "../contextos/ArticulosContext";

export const FormularioPagina = () => {
  const { id } = useParams();
  const editando = !!id;
  const [articuloEditado, setArticuloEditado] = useState({
    nombre: "",
    precio: "",
  });
  const { getArticulo, crearArticulo, modificarArticulo } =
    useContext(ArticulosContext);
  const history = useHistory();
  const [datosArticulo, setDatosArticulo] = useState({
    nombre: "",
    precio: "",
  });
  const primerInput = useRef(null);
  const setDato = (e) => {
    setDatosArticulo({
      ...datosArticulo,
      [e.target.id]: e.target.value,
    });
  };
  const enviarFormulario = (e) => {
    e.preventDefault();
    if (editando) {
      modificarArticulo({
        id: +id,
        ...datosArticulo,
        comprado: articuloEditado.comprado,
      });
    } else {
      crearArticulo({ ...datosArticulo, comprado: false });
    }
    history.push("/listado");
  };
  useEffect(() => {
    primerInput.current.focus();
  }, []);
  useEffect(() => {
    const cargaArticulo = async () => {
      if (editando) {
        const articulo = await getArticulo(id);
        setDatosArticulo({
          nombre: articulo.nombre,
          precio: articulo.precio,
        });
      }
    };
    cargaArticulo();
  }, [articuloEditado, editando, getArticulo, id]);

  return (
    <>
      <Info esFormulario={true} />
      <main className="principal espaciado">
        <h2 className="titulo-seccion">
          {editando ? "Editar" : "Crear"} artículo
        </h2>
        <form
          className="form-crear"
          autoComplete="off"
          onSubmit={enviarFormulario}
        >
          <label htmlFor="nombre">Nombre:</label>
          <input
            className="control"
            type="text"
            id="nombre"
            ref={primerInput}
            value={datosArticulo.nombre}
            onChange={setDato}
          />
          <label htmlFor="precio">Precio:</label>
          <div className="control-moneda">
            <input
              className="control"
              type="number"
              id="precio"
              value={datosArticulo.precio}
              onChange={setDato}
            />{" "}
            €
          </div>
          <button className="enviar" type="submit">
            {editando ? "Modificar" : "Crear"}
          </button>
        </form>
      </main>
    </>
  );
};
