import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthLayout } from './components/index.js'
import { createBrowserRouter,RouterProvider } from 'react-router'
import {Home,Login,Signup,Catagories,Product,Order,User, UserAddress,ChangePassword,EditDetails,CatagoryDetail,ProductDetails,BookProduct} from "./pages/index.js"
import { Provider } from 'react-redux'
import store from './Store/store.js'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
      path:"/",
      element:(
        <AuthLayout  >
          <Home />
          </AuthLayout>
      ) 
    },
    {
      path:'/login',
      element:(
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      )
    },
    {
      path:'/signup',
      element:(
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )
    },
    {
      path:"/catagories",
      element:(
        <AuthLayout >
          <Catagories />
          </AuthLayout>
      ) 
    },
    {
      path:"/products",
      element:(
        <AuthLayout >
          <Product />
          </AuthLayout>
      ) 
    },
    {
      path:"/orders",
      element:(
        <AuthLayout >
          <Order />
          </AuthLayout>
      ) 
    },
    {
      path:"/user",
      element:(
        <AuthLayout authentication={true}>
          <User />
          </AuthLayout>
      ) 
    },
    {
      path:"/UpdateAddressDetails/:id",
      element:(
        <AuthLayout authentication={true}>
          <UserAddress />
          </AuthLayout>
      ) 
    },
    {
      path:"/addAddress",
      element:(
        <AuthLayout authentication={true}>
          <UserAddress />
          </AuthLayout>
      ) 
    },
    {
      path:"/changePassword",
      element:(
        <AuthLayout authentication={true}>
          <ChangePassword />
          </AuthLayout>
      ) 
    },
    {
      path:"/changeUserDetails",
      element:(
        <AuthLayout authentication={true}>
          <EditDetails />
          </AuthLayout>
      ) 
    },
    {
      path:"/catagoryDetail/:id",
      element:(
        <AuthLayout>
          <CatagoryDetail />
          </AuthLayout>
      ) 
    },
    {
      path:"/productDetails/:id",
      element:(
        <AuthLayout>
          <ProductDetails />
          </AuthLayout>
      ) 
    },
    {
      path:"/bookproduct/:id",
      element:(
        <AuthLayout>
          <BookProduct />
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
