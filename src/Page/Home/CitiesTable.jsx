import { Link } from "react-router-dom";

const CitiesTable = ({ index, item, refetch }) => {

    const handleWeather = () => {

        refetch();
    }

    return (

        <tr>
            <th>
                <label>
                    {index + 1}
                </label>
            </th>

            <td>
                <Link
                    onClick={handleWeather}
                    className=" bg-blue-500 bg-opacity-20 px-2"
                    // target="_blank" //need to use localStorage
                    to={`/weather/${item.geoname_id}`}>
                    {item.name}
                </Link>
            </td>

            <td>{item.cou_name_en}</td>
            <td>{item.timezone}</td>
            <td>{item.population}</td>
            <td>{item.ascii_name}</td>
        </tr>

    );
};

export default CitiesTable;