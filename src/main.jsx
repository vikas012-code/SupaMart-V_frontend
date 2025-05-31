import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Product from './components/Product.jsx'
import Body from './components/Body.jsx'
import Category from './components/Category.jsx'
import HeroPage from './components/HeroPage.jsx'
import Cart from './components/Cart.jsx';
import CheckOut from './components/CheckOut.jsx';
import ShippingDetails from './components/ShippingDetails.jsx';
import PaymentDetails from './components/PaymentDetails.jsx';
import OrderedPlaced from './components/OrderPlaced.jsx';
import LoginPage from './components/LoginPage.jsx';
import MyAccount from './components/MyAccount.jsx';
import AboutUsPage from './components/AboutUsPage.jsx';
import Cancellation from './components/CancellationPage.jsx';
import PrivacyAndPolicy from './components/PrivacyAndPolicy.jsx';
import TermsAndCondition from './components/TermsAndCondition.jsx';

const Router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
       path : "/" ,
       element : 
       <>
        <HeroPage/>
        <Category props={"mobile"}/>
        <Category props={"TV"}/>
        <Category props={"audio"}/>
        <Category props={"gaming"}/>
       </>
      },
      {
        path :"/body",
        element : <Body/>
      },
      {
        path :"/body/:category",
        element : <Body/>
      },
      {
        path :"/product/:_id",
        element :<Product/>
      },
      {
        path :"/cart",
        element :<Cart/>
      },
      {
        path :"/checkout",
        element :<CheckOut/>,
        children:[
          {
            path:"/checkout",
            element:<ShippingDetails/>
          },
          {
            path:"/checkout/PaymentDetails",
            element:<PaymentDetails/>
          },
          {
            path:"/checkout/OrderedPlaced",
            element:<OrderedPlaced/>
          }
        ]
      }
      ,{
        path:"/account",
        element:<MyAccount/>
      }
      ,{
        path:"/aboutus",
        element:<AboutUsPage/>
      }
      ,
      {
        path:"/cancellation",
        element:<Cancellation/>
      }
      ,
      {
        path:"/privacyandpolicy",
        element:<PrivacyAndPolicy/>
      }
      ,
      {
        path:"/termsandcondition",
        element:<TermsAndCondition/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(<RouterProvider router={Router}/>)
