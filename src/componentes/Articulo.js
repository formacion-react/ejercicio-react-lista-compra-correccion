import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ArticulosContext } from "../contextos/ArticulosContext";

export const Articulo = (props) => {
  const {
    articulo: { id, nombre, precio, comprado },
    articulo,
  } = props;
  const { toggleArticulo, borrarArticulo } = useContext(ArticulosContext);
  const history = useHistory();
  const irAEdicion = () => {
    history.push(`/editar-articulo/${id}`);
  };
  return (
    <li className="articulo">
      <input
        type="checkbox"
        className="marcar"
        checked={comprado}
        onChange={() => toggleArticulo(articulo)}
      />
      <span
        className={`nombre${comprado ? " comprado" : ""}`}
        onClick={irAEdicion}
      >
        {nombre}
      </span>
      <span className="precio">{`${precio ? precio + "€" : ""}`}</span>
      <FaTimes onClick={() => borrarArticulo(id)} />
    </li>
  );
};
