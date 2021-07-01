import { useContext } from "react";
import { Articulo } from "../componentes/Articulo";
import { Info } from "../componentes/Info";
import { ArticulosContext } from "../contextos/ArticulosContext";

export const ListadoPagina = () => {
  const { articulos } = useContext(ArticulosContext);
  return (
    <>
      <Info />
      <main className="principal espaciado">
        <ul className="articulos">
          {articulos.map((articulo) => (
            <Articulo key={articulo.id} articulo={articulo} />
          ))}
        </ul>
        <span className="precio-total">1.95€</span>
      </main>
    </>
  );
};
