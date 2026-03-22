import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";



function Wallet({ mne, setMne }) {
  const [wallets, setWallets] = useState([]);

  // ---------------- LOAD ----------------
  useEffect(() => {
    const stored = localStorage.getItem("wallets");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWallets(JSON.parse(stored));
    }
  }, []);

  // ---------------- GENERATE ----------------
  const handleAddWallet = () => {
    if (!mne) {
      toast.error("Mnemonic not found!");
      return;
    }

    try {
      const seed = mnemonicToSeedSync(mne);
      const index = wallets.length;

      // ✅ REAL SOLANA PATH
      const path = `m/44'/501'/${index}'/0'`;

      const derivedSeed = derivePath(path, seed.toString("hex")).key;

      const keypair = Keypair.fromSeed(derivedSeed.slice(0, 32));

      const newWallet = {
        publicKey: keypair.publicKey.toBase58(),
        // eslint-disable-next-line no-undef
        privateKey: Buffer.from(keypair.secretKey).toString("hex"),
      };

      const updated = [...wallets, newWallet];

      setWallets(updated);
      localStorage.setItem("wallets", JSON.stringify(updated));

      toast.success(`Wallet ${index + 1} created!`);
    } catch (err) {
      console.error(err);
      toast.error("Error generating wallet");
    }
  };

  // ---------------- CLEAR ----------------
  const handleClearWallet = () => {
    setWallets([]);
    setMne("");
    localStorage.removeItem("wallets");
    localStorage.removeItem("mnemonic");
    toast.error("Wallets deleted!");
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Solana Wallet</h1>

        <div className="flex gap-2">
          <button
            onClick={handleAddWallet}
            className="bg-black text-white hover:bg-gray-800 px-3 py-2 rounded"
          >
            Generate Wallet
          </button>

          <button
            onClick={handleClearWallet}
            className="bg-red-900 hover:bg-red-500 text-white px-3 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* WALLETS */}
      <div className="mt-6 flex flex-col gap-4">
        {wallets.length === 0 && (
          <p className="text-gray-500">No wallets created</p>
        )}

        {wallets.map((wallet, i) => (
          <div key={i} className="p-4 bg-gray-800 text-white rounded-2xl">
            <p className="font-bold mb-2">Wallet {i + 1}</p>

            <p className="break-all text-sm">
              <b>Public Key:</b> {wallet.publicKey}
            </p>

            <p className="break-all text-sm mt-2">
              <b>Private Key:</b> {wallet.privateKey}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wallet;
