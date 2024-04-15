import rain from "../../../../public/rain.jpg"
import atmosphere from "../../../../public/atmosphere.jpg"
import clearSky from "../../../../public/clearSky.jpg"
import cloudy from "../../../../public/cloudy.jpg"
import drizzle from "../../../../public/drizzle.jpg"
import snow from "../../../../public/snow.jpg"
import thunder from "../../../../public/thunder.jpg"
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";

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

    // currentWeather 
    const { data: currentWeather = [] } = useQuery({
        queryKey: ['weather'],
        queryFn: async () =>
            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city[0]?.coordinates?.lat}&lon=${city[0]?.coordinates?.lon}&units=metric&appid=${import.meta.env.VITE_weather_forecast_key}`)
                .then((res) =>
                    res.json(),
                ),
    })
    console.log("city weather:", currentWeather);

    // hourlyForecast 
    // const { data: hourlyForecast = [] } = useQuery({
    //     queryKey: ['forecast'],
    //     queryFn: async () =>
    //         await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${currentWeather.id}&appid=${import.meta.env.VITE_weather_forecast_key}`)
    //             .then((res) =>
    //                 res.json(),
    //             ),
    // })
    // console.log("hourlyForecast:", hourlyForecast);


    // map 
    // const { data: weatherMap = [] } = useQuery({
    //     queryKey: ['maps', 'weather'],
    //     queryFn: async () =>
    //         await fetch(`http://maps.openweathermap.org/maps/2.0/weather/TA2/${x}/${y}/${z}?appid=${import.meta.env.VITE_weather_map_key}`)
    //             .then((res) =>
    //                 res.json(),
    //             ),
    // })
    // console.log("weather map:", weatherMap);

    const dateTime = new Date((new Date().getTime()) - currentWeather.timezone * 1000).toString();


    // google react map 
    const defaultProps = {
        center: {
            lat: city[0]?.coordinates?.lat,
            lng: city[0]?.coordinates?.lon
        },
        zoom: 11
    };
    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    // weather background 
    const [background, setBackground] = useState(false);
    useEffect(() => {
        if (currentWeather?.weather?.[0]?.main === "Rain") {
            setBackground(rain)
        }
        else if (currentWeather?.weather?.[0]?.main === "Clear") {
            setBackground(clearSky)
        }
        else if (currentWeather?.weather?.[0]?.main === "Thunderstorm") {
            setBackground(thunder)
        }
        else if (currentWeather?.weather?.[0]?.main === "Drizzle") {
            setBackground(drizzle)
        }
        else if (currentWeather?.weather?.[0]?.main === "Snow") {
            setBackground(snow)
        }
        else if (currentWeather?.weather?.[0]?.main === "Atmosphere") {
            setBackground(atmosphere)
        }
        else if (currentWeather?.weather?.[0]?.main === "Clouds") {
            setBackground(cloudy)
        }
    }, [currentWeather?.weather])

    return (
        <div className=" pt-24">
            {/* <p>city lon:{city[0]?.coordinates?.lon}</p>
            <p>city lat:{city[0]?.coordinates?.lat}</p> */}

            <div className="">
                <img className=" w-full max-h-72" src={background} alt="" />
            </div>


            {/* card  */}
            <div className="card lg:card-side bg-base-100 my-12">
                <div className="card-body">

                    <h2 className=" text-orange-500">{dateTime}</h2>
                    {/* <h2 className=" text-orange-500">{currentWeather.timezone}</h2> */}

                    <h2 className=" text-3xl font-black">{currentWeather?.name}, {currentWeather?.sys?.country}</h2>

                    <div className=" flex gap-3">
                        <div>
                            <img src={`https://openweathermap.org/img/wn/${currentWeather?.weather?.[0]?.icon}.png`} alt="" />
                        </div>
                        <h2 className=" text-4xl font-semibold">{currentWeather?.main?.temp} °C</h2>
                    </div>

                    <div className=" flex gap-4 text-lg font-semibold">
                        <h2 className=" bg-slate-200 px-1">Feels like {currentWeather?.main?.feels_like} °C.</h2>
                        <h2 className=" bg-slate-200 px-1">{currentWeather?.weather?.[0]?.description}.</h2>
                        <h2 className=" bg-slate-200 px-1">{currentWeather?.weather?.[0]?.main}.</h2>
                    </div>

                    <div className=" flex gap-7 ml-3">
                        <ul className=" list-disc">
                            <li>Wind speed: {currentWeather?.wind?.speed} meter/sec</li>
                            <li>Humidity: {currentWeather?.main?.humidity}%</li>
                        </ul>
                        <ul className=" list-disc">
                            <li>Atmospheric pressure: {currentWeather?.main?.pressure} hPa</li>
                            <li>Visibility: {currentWeather?.visibility} meter</li>
                        </ul>
                    </div>


                </div>

                {/* <figure><img src={weatherMap} alt="Album" /></figure> */}

                <div className=" w-1/2">
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={city[0]?.coordinates?.lat}
                            lng={city[0]?.coordinates?.lon}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>

                {/* <div>
                    <img src={weatherMap} alt="" />
                </div> */}

            </div>

        </div >
    );
};

export default Weather;