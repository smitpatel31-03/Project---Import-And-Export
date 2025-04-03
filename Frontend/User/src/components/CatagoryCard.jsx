import React from 'react';

function CategoryCard({ catagory }) {

    
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80">
      <img src={catagory.image} alt={catagory.name} className="w-full h-40 object-cover" />
      <div className="p-4 bg-blue-100">
        <h3 className="text-lg font-bold text-gray-900">{catagory.name}</h3>
        <p className="text-gray-700 text-sm mt-2">{catagory.description}</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Read more
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
