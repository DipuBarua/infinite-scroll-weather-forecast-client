import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/error404.png"

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div className=" text-center font-bold max-h-screen">

            {
                error.status === 404 ?
                    <div>
                        <img className=" mx-auto max-w-72 p-7" src={errorImg} alt="Error404!" />
                    </div>
                    :
                    <div>
                        <h1 className=" text-5xl p-5">Opps!</h1>
                        <p className=" text-red-600">Error: {error.statusText || error.message}</p>
                    </div>
            }

            <Link to={'/'}>
                <button className="btn text-xl font-bold bg-amber-500">Back To Home</button>
            </Link>

        </div>
    );
};

export default ErrorPage;