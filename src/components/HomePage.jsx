import React from 'react'
import HeroPage from './HeroPage'
import Category from './Category'

function HomePage() {
  return (
    <>
    <HeroPage/>
    <Category props={"mobile"}/>
    <Category props={"TV"}/>
    <Category props={"audio"}/>
    <Category props={"gaming"}/>
    </>
  )
}

export default HomePage