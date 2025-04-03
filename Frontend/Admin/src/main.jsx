import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router'
import {Catagies,Dashboard,Login,Order,Products,Signup,CatagoriesDetails,ProductDetails, OrderDetails, Admin,UpdateOrderDetails, AddCatagory,ChangeCatagoryDetail,ChangeCatagoryImage,AddProduct,ChangeProductDetail,ChangeProductFeatureImage,AddImagesToProduct} from './pages/index.js'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:"/",
        element: (
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
        )
      },
      {
        path:"/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path:"/admin",
        element: (
          <AuthLayout authentication={true}>
            <Admin />
          </AuthLayout>
        )
      },
      {
        path:"/categories",
        element: (
          <AuthLayout authentication={true}>
            <Catagies />
          </AuthLayout>
        )
      },
      {
        path:"/orders",
        element: (
          <AuthLayout authentication={true}>
            <Order />
          </AuthLayout>
        )
      },
      {
        path:"/products",
        element: (
          <AuthLayout authentication={true}>
            <Products />
          </AuthLayout>
        )
      },
      {
        path:"/CatagoriesDetails/:id",
        element: (
          <AuthLayout authentication={true}>
            <CatagoriesDetails />
          </AuthLayout>
        )
      },
      {
        path:"/ProductDetails/:id",
        element: (
          <AuthLayout authentication={true}>
            <ProductDetails />
          </AuthLayout>
        )
      },
      {
        path:"/OrderDetails/:id",
        element: (
          <AuthLayout authentication={true}>
            <OrderDetails />
          </AuthLayout>
        )
      },
      {
        path:"/UpdateOrderDetails/:id",
        element: (
          <AuthLayout authentication={true}>
            <UpdateOrderDetails />
          </AuthLayout>
        )
      },
      {
        path:"/addCatagory",
        element: (
          <AuthLayout authentication={true}>
            <AddCatagory />
          </AuthLayout>
        )
      },
      {
        path:"/changeCatagoryDetails/:id",
        element: (
          <AuthLayout authentication={true}>
            <ChangeCatagoryDetail />
          </AuthLayout>
        )
      },
      {
        path:"/ChangeCatagoryImage/:id",
        element: (
          <AuthLayout authentication={true}>
            <ChangeCatagoryImage />
          </AuthLayout>
        )
      },
      {
        path:"/addProduct/:id",
        element: (
          <AuthLayout authentication={true}>
            <AddProduct />
          </AuthLayout>
        )
      },
      {
        path:"/changeProductDetails/:id",
        element: (
          <AuthLayout authentication={true}>
            <ChangeProductDetail />
          </AuthLayout>
        )
      },
      {
        path:"/ChangeProductFeatureImage/:id",
        element: (
          <AuthLayout authentication={true}>
            <ChangeProductFeatureImage />
          </AuthLayout>
        )
      },
      {
        path:"/addImagesToProduct/:id",
        element: (
          <AuthLayout authentication={true}>
            <AddImagesToProduct />
          </AuthLayout>
        )
      },
      
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

