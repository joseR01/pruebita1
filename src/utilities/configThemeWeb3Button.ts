import { useWeb3ModalTheme } from "@web3modal/react";

export const configThemeWeb3Button = () =>{
    const { theme, setTheme } = useWeb3ModalTheme();
    // Modal's theme object
    // theme
    // Set modal theme
      setTheme({
        themeMode: 'dark',
        themeVariables: {
          // '--w3m-font-family': 'Roboto, sans-serif', // fuente
          '--w3m-accent-color': 'none', // color de fondo
          '--w3m-accent-fill-color': 'none', // icono 
          '--w3m-button-border-radius': '0%'
        }
      })
};