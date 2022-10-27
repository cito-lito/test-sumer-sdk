import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Web3ReactProvider } from "@web3-react/core";


import { SumerObserver, Client } from "sumer-sdk";
const key = '372eedbc-d6a0-4ee1-b53a-9ddcf71f22ac'

const getLibrary = (provider) => {
  //const library = new ethers.providers.Web3Provider(provider);
  const dsClient = new Client(provider, key)
  const library = new SumerObserver(dsClient, key);
  //library.pollingInterval = 5000; 
  return library;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
