import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Router from "./router";
import "./assets/css/app.css";
import UserContextProvider from "./stores/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserContextProvider>

 <BrowserRouter>
    <Provider store={store}>
      <Router />
    </Provider>
    <ScrollToTop />
  </BrowserRouter>
  </UserContextProvider>

);
