import React from 'react';
import { Link } from 'react-router-dom'; // Fixed incorrect import

function CatagoriesCard({ _id, name, image }) {
  
  return (
    <Link to={`/CatagoriesDetails/${_id}`}>
      <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition duration-300">
        
        <div className="w-full h-40 overflow-hidden rounded-lg mb-4 flex justify-center items-center bg-gray-800">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h2 className="text-xl font-bold text-white text-center">{name}</h2>
        
      </div>
    </Link>
  );
}

export default CatagoriesCard;
