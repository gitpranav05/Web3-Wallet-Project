// import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Mnemo from '../components/Mnemo';
import Wallet from '../components/Wallet';




function WalletLayout({setMne,mne}) {
  return (
    <div>
      <Mnemo setMne={setMne} mne={mne} />
      <Wallet setMne={setMne} mne={mne}/>
      
    </div>
  );
}

export default WalletLayout