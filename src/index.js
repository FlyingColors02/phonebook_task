import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./Store/store";
import thunk from "redux-thunk";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import { persistConfig } from "./Store/store";
import { BrowserRouter } from "react-router-dom";

let PersistReducer = persistReducer(persistConfig,reducers);
let store = createStore(PersistReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        
        <PersistGate loading={ null } persistor={ persistor }>
       <BrowserRouter>
       <App/>
       </BrowserRouter>
       
       
        </PersistGate>
        
    </Provider>

,document.getElementById("root"));