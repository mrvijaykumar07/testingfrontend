// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./Context/AppContext.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { LoadScript } from "@react-google-maps/api"; // ✅ MISSING IMPORT
import LoaderBoyRunning from "./Components/LoaderBoyRunning.jsx";
import "./index.css";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<LoaderBoyRunning loaderMsg="Preparing your app..." />}
        persistor={persistor}
      >
        <BrowserRouter>
          {/* <LoadScript
            googleMapsApiKey={apiKey}
            libraries={["places"]}
            loadingElement={<LoaderBoyRunning loaderMsg="Loading Map..." />} // ✅ use custom loader here
          > */}
           

            <AppProvider>
              <App />
            </AppProvider>
          {/* </LoadScript> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
