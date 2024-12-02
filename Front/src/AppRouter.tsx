
import { createBrowserRouter } from 'react-router-dom';

// import Products from './Components/Products/Products';
// import Messages from './Components/Messages/Messages';
// import OneMessage from './Components/Messages/OneMessage';
// import HomePage from "./Components/HomePage/HomePage"
// import Contact from './Components/Contact/Contact';
// import CreateAProduct from './Components/Products/CreateAProduct';
import SignUp from './Components/Users/SignUp';
import SignIn from './Components/Users/SignIn';

// export default  createBrowserRouter([
// {
//    path: "/",
//    element:<HomePage/>
// },
// {
//     path: "/contact",
//     element:<Contact/>
// },
// {
//     path: "/messgaes",
//     element:<Messages/>
// },
// {
//     path:"/oneMessage",
//     element:<OneMessage/>
// },
// {
//     path:"/createAProduct",
//     element: <CreateAProduct/>
// },
// {
//     path:"/",
//     element:<Products/>,
//    },
//  ])

    
export default  createBrowserRouter([
   {
      path:"/",
      element:<SignUp/>,
   },
   {
      path:"/signin",
      element:<SignIn/>
   }

])

    