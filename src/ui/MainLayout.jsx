import React from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input'

function MainLayout() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12">
      <Navbar />
      <Input />
    </div>
  );
}

export default MainLayout