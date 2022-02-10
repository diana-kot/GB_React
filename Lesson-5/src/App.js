import { Provider} from "react-redux";
import { Router } from "./components/Router";
import {store} from "./store"
const App = () => (
  <Provider store={ store }>
    <Router></Router>
  </Provider>

);

export default App;
