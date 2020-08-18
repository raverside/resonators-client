import "whatwg-fetch";
import "@babel/polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import App from "./containers/App";
import configureStore from "./stores";
import { actions as initActions } from "./actions/initActions";
import { actions as pwaActions } from "./actions/pwaActions";

function renderApp() {
    render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    );

    if (module.hot) {
        module.hot.accept("./containers/App", () => {
            const NextApp = require("./containers/App").default; // eslint-disable-line global-require

            render(
                <AppContainer>
                    <Provider store={store}>
                        <NextApp />
                    </Provider>
                </AppContainer>,
                document.getElementById("app")
            );
        });
    }
}

function registerServiceWorker() {
    window.addEventListener("load", () => {
        if (navigator.serviceWorker) {
            console.log("Registering service worker...");
            navigator.serviceWorker
                .register(`${process.env.ASSET_PATH}/serviceWorker.js`, { scope: "/" })
                .then(() => console.log("Service worker registered!"))
                .catch(() => console.log("Service worker registration failed :("));
        } else {
            console.log("Service workers are not supported by this browser");
        }
    });
}

function registerInstallationActions(dispatch) {
    window.addEventListener("beforeinstallprompt", (installPrompt) => {
        installPrompt.preventDefault();
        dispatch(pwaActions.registerInstallPrompt(installPrompt));
    });
    window.addEventListener("appinstalled", () => {
        dispatch(pwaActions.appInstalled());
    });
}

const store = configureStore();
store.dispatch(initActions.initApp());
renderApp();
registerServiceWorker();
registerInstallationActions(store.dispatch);
