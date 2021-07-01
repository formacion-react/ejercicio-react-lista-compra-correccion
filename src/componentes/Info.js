import { useContext } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { ArticulosContext } from "../contextos/ArticulosContext";

export const Info = (props) => {
  const { esFormulario } = props;
  const history = useHistory();
  const { nArticulos, nArticulosComprados } = useContext(ArticulosContext);
  const onClickIcono = () => {
    if (esFormulario) {
      history.push("/listado");
    } else {
      history.push("/nuevo-articulo");
    }
  };
  return (
    <section className="info espaciado bloque-superior">
      {esFormulario ? (
        <FaMinusCircle className="icono" onClick={onClickIcono} />
      ) : (
        <FaPlusCircle className="icono" onClick={onClickIcono} />
      )}
      <p className="n-articulos">
        {nArticulosComprados}/{nArticulos} comprados
      </p>
    </section>
  );
};
