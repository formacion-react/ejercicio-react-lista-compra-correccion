import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Cabecera } from "./componentes/Cabecera";
import { ArticulosContextProvider } from "./contextos/ArticulosContextProvider";
import { AcercaDePagina } from "./paginas/AcercaDePagina";
import { FormularioPagina } from "./paginas/FormularioPagina";
import { ListadoPagina } from "./paginas/ListadoPagina";
import { NotFoundPagina } from "./paginas/NotFoundPagina";
import { PrincipalPagina } from "./paginas/PrincipalPagina";

function App() {
  return (
    <>
      <ArticulosContextProvider>
        <Router>
          <Cabecera />
          <Switch>
            <Route path="/principal" exact>
              <PrincipalPagina />
            </Route>
            <Route path="/listado" exact>
              <ListadoPagina />
            </Route>
            <Route path="/nuevo-articulo" exact>
              <FormularioPagina />
            </Route>
            <Route path="/editar-articulo/:id" exact>
              <FormularioPagina />
            </Route>
            <Route path="/acerca-de" exact>
              <AcercaDePagina />
            </Route>
            <Route path="/" exact>
              <Redirect to="/principal" />
            </Route>
            <Route path="**">
              <NotFoundPagina />
            </Route>
          </Switch>
        </Router>
      </ArticulosContextProvider>
    </>
  );
}

export default App;
