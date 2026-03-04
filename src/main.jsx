// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./Context/AppContext.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";


import "./index.css";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
       
        persistor={persistor}
      >
        <BrowserRouter>
    
           

            <AppProvider>
              <App />
            </AppProvider>
         
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
