import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Addtask from "../../Pages/Addtask/Addtask";
import CompletedTask from "../../Pages/CompletedTask/CompletedTask";
import LogIn from "../../Pages/Login/LogIn";
import Mytask from "../../Pages/Mytask/Mytask";
import UpdateMyTask from "../../Pages/Mytask/UpdateMyTask";
import SignUp from "../../Pages/SignUp/SignUp";
import Error from "../../Shared/Error/Error";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const Router = createBrowserRouter([
    {
        path: '*',
        element: <Error></Error>
    },
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Addtask></Addtask></PrivateRoute>
            },
            {
                path: '/mytask',
                element: <PrivateRoute><Mytask></Mytask></PrivateRoute>
            },
            {
                path: '/completedtask',
                element: <PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
            
            {
                path: '/updatetask/:id',
                element: <PrivateRoute><UpdateMyTask></UpdateMyTask></PrivateRoute>
            },
        ]
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/login',
        element: <LogIn></LogIn>
    },
])