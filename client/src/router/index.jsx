import { createBrowserRouter } from "react-router-dom"
import { Chat } from "../views/chat"
import Login from "../views/login"
import { Message } from "../views/message"
import Home from "../views/home"
import ChatEx from "../views/chat.exam"     // test purposes

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <Home />
    // },
    // {
    //     path: '/login',
    //     element: <Login/>
    // },
    // {
    //     path: '/chat',
    //     element: <Chat/>
    // },
    // {
    //     path: '/convo/:id',
    //     element: <Message/>
    // },
    {
        path: '/',
        element: <ChatEx/>
    }

])

export default router