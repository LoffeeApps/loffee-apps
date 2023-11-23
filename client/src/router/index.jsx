import { createBrowserRouter } from "react-router-dom"
import { Chat } from "../views/chat"
import Login from "../views/login"
import { Message } from "../views/message"
import Home from "../views/home"
import ChatEx from "../views/chat.exam"     // test purposes
import Register from "../views/register"
import Friend from "../views/friends"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
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
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/friends',
        element: <Friend/>
    },

    // {
    //     path: '/',
    //     element: <ChatEx/>
    // }

])

export default router