import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Wallet({ setMne }) {
  const [wallets, setWallets] = useState([]);

  const mnemonic =
    "wage giraffe private vanish amazing print tip scrap live resource impact vapor";

  // ✅ Load wallets on mount
  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    if (storedWallets) {
      setWallets(JSON.parse(storedWallets));
    }
  }, []);

  // ✅ Save wallets whenever they change
  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, [wallets]);

  async function handleAddWallet() {
    if (!mnemonic) {
      toast.error("No mnemonic found!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/generate-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mnemonic,
          index: wallets.length,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate wallet");
      }

      // ✅ Add new wallet
      setWallets((prev) => [...prev, data]);

      toast.success("Wallet added!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  }

  function handleClearWallets() {
    setMne("");
    setWallets([]);
    localStorage.removeItem("wallets"); // ✅ remove stored wallets
    localStorage.removeItem("mnemonic");
    toast.error("Wallets deleted!");
  }

  return (
    <div className="py-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Solana Wallet</h1>

        <div className="flex gap-2">
          <button
            onClick={handleAddWallet}
            className="bg-black text-white dark:hover:bg-amber-50 dark:text-black  hover:bg-gray-800 hover: dark:bg-gray-200 transition-all duration-300 hover:cursor-pointer  px-2 py-2 rounded"
          >
            Add Wallet
          </button>

          <button
            onClick={handleClearWallets}
            className="bg-red-900 hover:bg-red-500 text-white rounded p-2"
          >
            Clear Wallets
          </button>
        </div>
      </div>

      {/* 🔥 Wallet UI */}
      <div className="mt-6 space-y-4">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 rounded-xl shadow text-white"
          >
            <p className="text-sm">
              <strong>Wallet {index + 1}</strong>
            </p>

            <p className="text-sm break-all">
              <strong>Public Key:</strong> {wallet.publicKey}
            </p>

            <p className="text-sm break-all">
              <strong>Private Key:</strong> {wallet.privateKey}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wallet;
