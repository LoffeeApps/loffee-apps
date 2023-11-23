import {createBrowserRouter} from "react-router-dom"
import { Chat } from "../views/chat"
import Login from "../views/login"
import { Message } from "../views/message"

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/chat',
        element: <Chat/>
    },
    {
        path: '/convo/:id',
        element: <Message/>
    },
    
])

export default router