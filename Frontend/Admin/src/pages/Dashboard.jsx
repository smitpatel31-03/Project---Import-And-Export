import React, { useEffect, useState } from "react";
import service from "../services/config";
import { CatagoriesCard, ProductCard, OrderCard, Container } from "../components/index.js";

function Dashboard() {
  const [catagory, setCatagory] = useState([]);
  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catData = await service.getAllCatagories();
        setCatagory(Array.isArray(catData) ? catData : []);

        const prodData = await service.getAllProducts();
        const productsArray = Array.isArray(prodData.data) ? prodData.data : [prodData.data];
        setProduct(productsArray);

        const ordData = await service.getCurruntOrders();
        setOrder(Array.isArray(ordData) ? ordData : []);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(catagory);
  

  

  return (
    <div className="w-full min-h-screen bg-zinc-800 text-gray-200">
      <div>
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">📂 Categories</h2>
        {catagory.length === 0 ? (
          <div className="p-6 text-xl font-semibold text-gray-400">No Categories Found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {catagory.map((cat) => (
              <CatagoriesCard key={cat._id} Catagory={cat} />
            ))}
          </div>
        )}
      </Container>
      </div>

      <div className="mt-10">
      <Container>
        <h2 className="text-3xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">🛒 Products</h2>
        {product.length === 0 ? (
          <div className="p-6 text-xl font-semibold text-gray-400">No Products Found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {product.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        )}
      </Container>
      </div>

<div className="mt-10">
      <Container>
        <h1 className="text-3xl font-bold mb-6 text-gray-100 border-b border-gray-700 pb-2">📦 Orders</h1>

        {order.length === 0 ? (
          <div className="p-6 text-xl font-semibold text-gray-400">No Orders Found</div>
        ) : (
          <div className="space-y-4">
            {order.map((ord) => (
              <div key={ord._id} className="w-full">
                <OrderCard {...ord} />
              </div>
            ))}
          </div>
        )}
      </Container>
      </div>
    </div>
  );
}

export default Dashboard;
