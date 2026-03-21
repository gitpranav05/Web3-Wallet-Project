import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'
import Wallet from './WalletLayout';
import WalletLayout from './WalletLayout';

function MainLayout() {
  const [mne, setMne] = useState("");
  
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 ">
      <Navbar />
      {mne?<WalletLayout mne={mne} setMne={setMne}/>:<Input setMne={setMne}/>}
    </div>
  );
}

export default MainLayout