import React from 'react';
import { Link } from 'react-router-dom';
// Note: The image import is no longer needed here since it's passed as a prop from the parent.

function CategoryCard({ name, img }) {
  return (
    <Link to={`/products/${name}`} >
    <div className='flex flex-col items-center '>
      <div className="categoryImg  ">
        <img src={'http://localhost:8000'+img} alt={name} className='rounded-full  max-w-[130px] min-w-[130px] '  />
      </div>
      <div className="categoryName text-white">
        <h3>{name}</h3>
      </div>
    </div>
    </Link>
  );
}

export default CategoryCard;
