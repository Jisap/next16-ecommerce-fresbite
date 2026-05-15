import React from 'react'
import Hero from './Hero/page'
import Category from './Category/page'
import TopSelling from './TopSelling/page'
import products from '@/app/JsonData/TopSelling.json'

const Index = () => {
  return (
    <>
      <Hero />
      <Category />
      <TopSelling product={products} />
    </>
  )
}

export default Index