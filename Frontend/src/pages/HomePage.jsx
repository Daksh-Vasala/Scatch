import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Navbar from '../components/Navbar.jsx'

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <ProductGrid />
      </div>
    </div>
  )
}

export default HomePage