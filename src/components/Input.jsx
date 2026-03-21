import { generateMnemonic } from "bip39";
import React from "react";

function Input({setMne}) {
  return (
    <div>
      <div className="py-16 dark:text-white text-black  ">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Secret Recovery Phrase
        </h1>
        <h1 className="text-xl md:text-4xl py-2">
          Save these words in a safe place
        </h1>
      </div>
      <div className="  flex flex-col sm:flex-row  justify-between gap-2 ">
        {/* //INPUT and Button */}
        <input
          className="text-white-500 flex-1 py-2 px-2 rounded dark:focus:outline-white focus:outline-black  outline-1 "
          placeholder="Enter your secret phrase (or leave blank to generate)"
          type="text"
          name=""
          id=""
        />
        <button
          onClick={() => {
            const m = generateMnemonic();
            setMne(m);
          }}
          className="bg-black text-white dark:text-black  hover:bg-white dark:bg-gray-200 transition-all duration-300 hover:cursor-pointer  px-2 py-2 rounded"
        >
          Generate Wallet
        </button>
      </div>
    </div>
  );
}

export default Input;
