import React, { useEffect } from 'react';
import HeroSlider from '../componets/HeroSlider';
import CategoryCard from '../componets/categoryCard';
import image from '../assets/images/product1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../Features/category/categorySlice';
import ProductCard from '../componets/ProductCard';
import ProductSection from '../componets/ProductSection';
import { Footer } from '../componets/Footer';

function Home() {
  const dispatch = useDispatch()
  const { category } = useSelector((state) => state.category)
  useEffect(() => {

    dispatch(getCategory())
    category
  }, [dispatch])




  return (
    <div>
      <HeroSlider />

      <div className="categorySection flex flex-wrap justify-center items-center gap-5 m-5">
        {category.map((category, index) => (

          <CategoryCard key={index} name={category.name} img={category.imagePath} />
        ))}
      </div>

      <ProductSection/>
     


   


    </div>
  );
}

export default Home;
