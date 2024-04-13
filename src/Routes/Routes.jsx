import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Page/Home/Home";
import Weather from "../Page/Shared/Weather/Weather";
import ErrorPage from "../Page/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "weather/:id",
                element: <Weather></Weather>
            }
        ]
    },
]);

export default router;