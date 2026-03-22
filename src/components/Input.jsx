import { generateMnemonic } from "bip39";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Input({ setMne }) {
  const [inputValue, setInputValue] = useState("");

  const handleGenerate = () => {
    let m;

    if (inputValue.trim() !== "") {
      // ✅ Use user-entered mnemonic
      m = inputValue.trim();
      toast.success("Using entered mnemonic!");
    } else {
      // ✅ Generate new mnemonic
      m = generateMnemonic();
      toast.success("New mnemonic generated!");
    }

    setMne(m);

    const mnemonicArray = m.split(" ");
    localStorage.setItem("mnemonic", JSON.stringify(mnemonicArray));
  };

  return (
    <div>
      <div className="py-16 dark:text-white text-black">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Secret Recovery Phrase
        </h1>
        <h1 className="text-xl md:text-4xl py-2">
          Save these words in a safe place
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-2">
        {/* INPUT */}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 py-2 px-2 rounded outline-1 dark:focus:outline-white focus:outline-black"
          placeholder="Enter your secret phrase (or leave blank to generate)"
          type="text"
        />

        {/* BUTTON */}
        <button
          onClick={handleGenerate}
          className="bg-black text-white hover:bg-gray-800 px-2 py-2 rounded"
        >
          Generate Wallet
        </button>
      </div>
    </div>
  );
}

export default Input;
