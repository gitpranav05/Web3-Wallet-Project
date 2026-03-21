import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function Mnemo({ setMne, mne }) {
  const [open, setOpen] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(mne);
    alert("Copied!"); // temporary (we'll improve this)
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 text-white ">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between hover:cursor-pointer text-2xl"
      >
        <h1>
          {open ? "Do not share this phrase with anyone" : "Your Secret Phrase"}
        </h1>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="hover:cursor-pointer hover:bg-gray-600 px-2 py-2 rounded transition-all duration-300"
        >
          {open ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>
      {open && (
        <div onClick={handleCopy}>
          <h1>Click anywhere to copy </h1>
        </div>
      )}
    </div>
  );
}

export default Mnemo;
