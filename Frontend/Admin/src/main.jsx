import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router'
import {Catagies,Dashboard,Login,Order,Products,Signup,CatagoriesDetails,ProductDetails, OrderDetails, Admin} from './pages/index.js'
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

