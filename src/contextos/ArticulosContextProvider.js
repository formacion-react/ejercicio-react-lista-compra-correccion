import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ArticulosContext } from "./ArticulosContext";

export const ArticulosContextProvider = (props) => {
  const urlAPI = process.env.REACT_APP_URL_API;
  const { children } = props;
  const { superFetch } = useFetch();
  const [articulos, setArticulos] = useState([]);
  const cargarArticulos = useCallback(async () => {
    const articulos = await superFetch(urlAPI);
    setArticulos(articulos);
  }, [superFetch, urlAPI]);
  const getArticulo = useCallback(
    async (id) => {
      try {
        const articulo = await superFetch(`${urlAPI}${id}`);
        return articulo;
      } catch {}
    },
    [superFetch, urlAPI]
  );
  const crearArticulo = async (articulo) => {
    try {
      const nuevoArticulo = await superFetch(urlAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articulo),
      });
      setArticulos([...articulos, nuevoArticulo]);
    } catch {}
  };
  const borrarArticulo = async (id) => {
    try {
      await superFetch(`${urlAPI}${id}`, { method: "DELETE" });
      setArticulos(articulos.filter((articulo) => articulo.id !== id));
    } catch {}
  };
  const modificarArticulo = async (articulo) => {
    try {
      const articuloModificado = await superFetch(`${urlAPI}${articulo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articulo),
      });
      setArticulos(
        articulos.map((articuloBuscado) =>
          articuloBuscado.id === articulo.id
            ? articuloModificado
            : articuloBuscado
        )
      );
    } catch {}
  };
  const toggleArticulo = async (articulo) => {
    try {
      await superFetch(`${urlAPI}${articulo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comprado: !articulo.comprado }),
      });
      setArticulos(
        articulos.map((articuloBuscado) =>
          articuloBuscado.id === articulo.id
            ? { ...articuloBuscado, comprado: !articuloBuscado.comprado }
            : articuloBuscado
        )
      );
    } catch {}
  };
  useEffect(() => {
    cargarArticulos();
  }, [cargarArticulos]);
  return (
    <ArticulosContext.Provider
      value={{
        articulos,
        nArticulos: articulos.length,
        nArticulosComprados: articulos.filter((articulo) => articulo.comprado)
          .length,
        toggleArticulo,
        getArticulo,
        crearArticulo,
        modificarArticulo,
        borrarArticulo,
      }}
    >
      {children}
    </ArticulosContext.Provider>
  );
};
