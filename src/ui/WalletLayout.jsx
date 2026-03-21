// import React, { useState } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Mnemo from '../components/Mnemo';
import Wallet from '../components/Wallet';




function WalletLayout({setMne,mne}) {
  return (
    <div>
      <Mnemo  mne={mne}/>
      <Wallet setMne={setMne}/>
    </div>
  );
}

export default WalletLayout