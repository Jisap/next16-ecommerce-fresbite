import React from 'react'
import Hero from './Hero/page'
import Category from './Category/page'
import TopSelling from './TopSelling/page'
import products from '@/app/JsonData/TopSelling.json'
import Offers from './Offers/page'
import CategoriesOffers from './CategoriesOffers/page'
import BannerOffers from './BannerOffers/page'
import OrganicProducts from './OrganicProducts/page'

const Index = () => {
  return (
    <>
      <Hero />
      <Category />
      <TopSelling product={products} />
      <Offers />
      <CategoriesOffers />
      <BannerOffers />
      <OrganicProducts />
    </>
  )
}

export default Index