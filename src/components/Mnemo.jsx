import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Toaster } from "react-hot-toast";


function Mnemo({   mne }) {
  const [open, setOpen] = useState(false);
  
  function handleCopy() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(mne);
    } else {
      // fallback for mobile / http
      const textArea = document.createElement("textarea");
      textArea.value = mne;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Copy failed", err);
      }

      document.body.removeChild(textArea);
    }

    toast.success("Copied to clipboard!");
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
          className="hover:cursor-pointer hover:bg-gray-600 px-2 py-2 rounded transition-all duration-300"
        >
          {open ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>
      {open && (
        <div className="py-20" onClick={handleCopy}>
          <h1>Click anywhere to copy </h1>
        </div>
      )}
    </div>
  );
}

export default Mnemo;
