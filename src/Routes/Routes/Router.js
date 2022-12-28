import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Addtask from "../../Pages/Addtask/Addtask";
import CompletedTask from "../../Pages/CompletedTask/CompletedTask";
import Mytask from "../../Pages/Mytask/Mytask";
import Error from "../../Shared/Error/Error";

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
                element: <Addtask></Addtask>
            },
            {
                path: '/mytask',
                element: <Mytask></Mytask>
            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            }
        ]
    }
])