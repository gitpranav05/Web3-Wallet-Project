import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCaretDown, FaCaretUp, FaRegCopy } from "react-icons/fa";


function Mnemo({ setMne, mne }) {
  const [open, setOpen] = useState(false);
  const [words, setWords] = useState([]);

  useEffect(()=>{
    if(mne){
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWords(mne.split(" "));
    }
    else{
      const stored = localStorage.getItem("mnemonic");
      if(stored){
        const parsed = JSON.parse(stored);
        setWords(parsed);
        setMne(parsed.join(" "))
      }
      
    }
  }, [mne,setMne])

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
        <button className="hover:cursor-pointer hover:bg-gray-600 px-2 py-2 rounded transition-all duration-300">
          {open ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>
      {open && (
        <div
          onClick={handleCopy}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 cursor-pointer"
        >
          {words.map((word, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded-md">
              {word}
            </div>
          ))}
          <div className="flex gap-1 ">
            <FaRegCopy className="flex my-0.5" />
            <h1 className="">Click anywhere to copy</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mnemo;
