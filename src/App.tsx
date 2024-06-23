import "./App.css";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));
    };

    getProvider();
  }, []);

  const updateWallet = (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    if (wallet.accounts.length > 0) {
      // Disconnect logic
      updateWallet([]); // Clear the wallet state
    } else {
      // Connect logic
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      updateWallet(accounts);
    }
  };

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>

      {hasProvider && (
        <button onClick={handleConnect}>
          {wallet.accounts.length > 0
            ? "Disconnect MetaMask"
            : "Connect MetaMask"}
        </button>
      )}

      {wallet.accounts.length > 0 && (
        <div>Wallet Accounts: {wallet.accounts[0]}</div>
      )}
    </div>
  );
};

export default App;
