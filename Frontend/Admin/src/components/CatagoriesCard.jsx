import React from 'react';
import { Link } from 'react-router-dom'; // Fixed incorrect import

function CatagoriesCard({Catagory}) {

  return (
    <Link to={`/CatagoriesDetails/${Catagory?._id}`}>
      <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 hover:shadow-lg transition duration-300">
        
        <div className="w-full h-40 overflow-hidden rounded-lg mb-4 flex justify-center items-center bg-gray-800">
          <img
            src={Catagory?.image}
            alt={Catagory?.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h2 className="text-xl font-bold text-white text-center">{Catagory?.name}</h2>
        
      </div>
    </Link>
  );
}

export default CatagoriesCard;
