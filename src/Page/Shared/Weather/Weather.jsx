import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Weather = () => {
    const { id } = useParams();
    // console.log("id", id);

    const [cities] = useInfiniteScroll();
    // console.log('cities0:', cities);

    const city = cities.filter(item => item.geoname_id === id);
    // console.log('city:', city);


    // const [items, setItems] = useState([]);
    // useEffect(() => {
    //     fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${city[0]?.coordinates?.lon}&lon=${city[0]?.coordinates?.lat}&appid=${import.meta.env.VITE_weather_forecast_key}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             // setItems(data);
    //         })
    // }, [city])


    const { data: currentWeather = [] } = useQuery({
        queryKey: ['weather'],
        queryFn: () =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0]?.coordinates?.lat}&lon=${city[0]?.coordinates?.lon}&appid=${import.meta.env.VITE_weather_forecast_key}`)
                .then((res) =>
                    res.json(),
                ),
    })
    console.log("city weather:", currentWeather);




    return (
        <div className=" pt-24">
            <p>city: {cities.length}</p>
            <p>city lon:{city[0]?.coordinates?.lon}</p>
            <p>city lat:{city[0]?.coordinates?.lat}</p>

            <div className=" bg-orange-400 text-white p-4">
                <p className=" text-black text-xl">{currentWeather.name}</p>
                <h2>Temperature: {currentWeather?.main?.temp}Kelvin</h2>
                <h2>Weather description: {currentWeather?.weather?.[0]?.description}</h2>
                <h2>Humidity:{currentWeather?.main?.humidity}%</h2>
                <h2>Wind speed: {currentWeather?.wind?.speed} meter/sec</h2>
                <h2>Atmospheric pressure: {currentWeather?.main?.pressure}hPa</h2>

                <h2>temperature highs:{currentWeather?.main?.temp_max}Kelvin</h2>
                <h2>temperature lows:{currentWeather?.main?.temp_min}Kelvin</h2>
                <h2>weather: {currentWeather?.weather?.[0]?.main}</h2>
                <h2>precipitation chances</h2>
            </div>

        </div>
    );
};

export default Weather;