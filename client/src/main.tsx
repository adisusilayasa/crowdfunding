import React from "react";
import { createRoot } from "react-dom/client";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import "./index.css";
import App from "./App";
import { StateContextProvider } from "./context";
import { client } from "./client";
import { LineaSepolia} from "@thirdweb-dev/chains";


console.log(client.clientId)

createRoot(document.getElementById("root")!).render(
  <ThirdwebProvider  clientId={client.clientId} activeChain={LineaSepolia.chainId} supportedChains={[LineaSepolia]}>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </ThirdwebProvider>
);
