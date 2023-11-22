import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    createBrowserRouter,
 
} from "react-router-dom";
import HomePage from "../src/views/HomePage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        //loader: rootLoader,
        children: [
           
        ],
    },
]);

export default router