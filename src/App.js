import Layout from "./components/Layout";
import 'react-tooltip/dist/react-tooltip.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "./styles/index.scss";

// importaciones para el cambio de idioma
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import esTranslation from "./i18n/es.json";
import enTranslation from "./i18n/en.json";
import arTranslation from "./i18n/ar.json";
import ruTranslation from "./i18n/ru.json";
import zhTranslation from "./i18n/zh.json";


/** Import de Wallet Connect */
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import { useLocation } from "react-router-dom";
/** Cierre de Import de Wallet Connect */

/** IdProject */
const projectId = 'bc4904243c060963fe08bb21457bc086';
/** Config de Wallet Connect */
const chains = [bscTestnet]
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
/** Cierre de Config de Wallet Connect */

/** Configuracion del cambio de idioma */
let getLanguageStore = localStorage.getItem("language")

i18next.init({
  interpolation: { escapeValue: false },
  lng: getLanguageStore,
  fallbackLng: "es",
  resources: {
    es: {
      translation: esTranslation,
    },
    en: {
      translation: enTranslation,
    },
    ru: {
      translation: ruTranslation
    },
    zh: {
      translation: zhTranslation
    },
    ar: {
      translation: arTranslation
    }
  },
});

function App() {
  const { pathname } = useLocation();

  return (
    <div className={` App ${pathname === "/" ||
        pathname === "/welcome"
        ? "bodyBlue"
        : "bodygray"
      }`}>
      <WagmiConfig client={wagmiClient}>
        <I18nextProvider i18n={i18next}>
          <Layout />
        </I18nextProvider>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </div>
  );
}

export default App;
