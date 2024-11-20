
import { createBrowserRouter } from 'react-router-dom';
import Messages from './Components/Messages/Messages';
import OneMessage from './Components/Messages/OneMessage';
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
//     }
//  ])

    
export default  createBrowserRouter([
    {
        path: "/",
        element:<Messages/>
    },
    {
        path:"/oneMessage",
        element:<OneMessage/>
    }
])

