import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import Product from './components/Product.jsx'
// import Body from './components/ProductCards.jsx'
// import Cart from './components/Cart.jsx';
// import CheckOut from './components/CheckOut.jsx';
// import ShippingDetails from './components/ShippingDetails.jsx';
// import PaymentDetails from './components/PaymentDetails.jsx';
// import OrderedPlaced from './components/OrderPlaced.jsx';
// import MyAccount from './components/MyAccount.jsx';
// import AboutUsPage from './components/AboutUsPage.jsx';
// import Cancellation from './components/CancellationPage.jsx';
// import PrivacyAndPolicy from './components/PrivacyAndPolicy.jsx';
// import TermsAndCondition from './components/TermsAndCondition.jsx';

import Loading from './components/Loading.jsx';
import HomePage from './components/HomePage.jsx';
import ScrollTop from './components/ScrollTop.jsx';



const ProductCards = lazy(()=> import("./components/ProductCards.jsx"))
const Product = lazy(()=> import("./components/Product.jsx"))
const Cart = lazy(()=> import("./components/Cart.jsx"))
const CheckOut = lazy(()=> import("./components/CheckOut.jsx"))
const ShippingDetails = lazy(()=> import("./components/ShippingDetails.jsx"))
const PaymentDetails = lazy(()=> import("./components/PaymentDetails.jsx"))
const OrderedPlaced = lazy(()=> import("./components/OrderPlaced.jsx"))
const MyAccount = lazy(()=> import("./components/MyAccount.jsx"))
const AboutUsPage = lazy(()=> import("./components/AboutUsPage.jsx"))
const Cancellation = lazy(()=> import("./components/CancellationPage.jsx"))
const PrivacyAndPolicy = lazy(()=> import("./components/PrivacyAndPolicy.jsx"))
const TermsAndCondition = lazy(()=> import("./components/TermsAndCondition.jsx"))




const Router = createBrowserRouter([
  {
    element: <ScrollTop />, // 👈 wrapper with scroll fix
    children: [
      {
      path : "/",
      element : <App/>,
      children : [
        {
        path : "/" ,
        element : <HomePage/>
        },
        {
          path :"/ProductCards",
          element : <Suspense fallback={<Loading/>} ><ProductCards/></Suspense>
        },
        {
          path :"/ProductCards/:category",
          element : <Suspense fallback={<Loading/>} ><ProductCards/></Suspense>
        },
        {
          path :"/product/:_id",
          element :<Suspense fallback={<Loading/>} ><Product/></Suspense>
        },
        {
          path :"/cart",
          element :<Suspense fallback={<Loading/>} ><Cart/></Suspense>
        },
        {
          path :"/checkout",
          element :<Suspense fallback={<Loading/>} ><CheckOut/></Suspense>,
          children:[
            {
              path:"/checkout",
              element:<Suspense fallback={<Loading/>} ><ShippingDetails/></Suspense>
            },
            {
              path:"/checkout/PaymentDetails",
              element:<Suspense fallback={<Loading/>} ><PaymentDetails/></Suspense>
            },
            {
              path:"/checkout/OrderedPlaced",
              element:<Suspense fallback={<Loading/>} ><OrderedPlaced/></Suspense>
            }
          ]
        }
        ,{
          path:"/account",
          element:<Suspense fallback={<Loading/>} ><MyAccount/></Suspense>
        }
        ,{
          path:"/aboutus",
          element:<Suspense fallback={<Loading/>} ><AboutUsPage/></Suspense>
        }
        ,
        {
          path:"/cancellation",
          element:<Suspense fallback={<Loading/>} ><Cancellation/></Suspense>
        }
        ,
        {
          path:"/privacyandpolicy",
          element:<Suspense fallback={<Loading/>} ><PrivacyAndPolicy/></Suspense>
        }
        ,
        {
          path:"/termsandcondition",
          element:<Suspense fallback={<Loading/>} ><TermsAndCondition/></Suspense>
        }
      ]
      }
      ]
  }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={Router}/>)
