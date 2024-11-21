
import { createBrowserRouter } from 'react-router-dom';
import CreateAProduct from './Components/Products/CreateAProduct';
// import Messages from './Components/Messages/Messages';
// import OneMessage from './Components/Messages/OneMessage';
// import HomePage from "./Components/HomePage/HomePage"
// import Contact from './Components/Contact/Contact';

// export default  createBrowserRouter([
//     {
//         path: "/",
//         element:<HomePage/>
//     },
//      {
//         path: "/contact",
//         element:<Contact/>
//     },
// {
//     path: "/messgaes",
//     element:<Messages/>
// },
// {
//     path:"/oneMessage",
//     element:<OneMessage/>
// }
//  ])

    
export default  createBrowserRouter([
    {
        path:"/",
        element: <CreateAProduct/>
    }
])

