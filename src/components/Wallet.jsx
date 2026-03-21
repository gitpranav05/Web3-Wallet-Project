import React from 'react'

function Wallet({setMne}) {
  return (
    <div className="py-6">
      <div className="flex justify-between">


        <h1 className="text-3xl font-bold ">Solana Wallet</h1>
        <div className='flex gap-1' >
        <button className="bg-black text-white dark:text-black  hover:bg-white dark:bg-gray-200 transition-all duration-300 hover:cursor-pointer  px-2 py-2 rounded">
          Add Wallet
        </button>
        <button
          onClick={() => {
              setMne("");
            }}
            className="bg-red-900 hover:bg-red-500 text-white transition-all duration-300 rounded p-2 text-md hover:cursor-pointer"
            >
          Delete Wallet
        </button>
            </div>
      </div>
    </div>
  );
}

export default Wallet