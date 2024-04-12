import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const Home = () => {
    const [cities, fetchNextPage, hasNextPage] = useInfiniteScroll();


    return (
        <div>
            <p>Weather Forecast</p>

            <InfiniteScroll
                dataLength={cities ? cities.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<div>loading....</div>}>

                <div className=" grid grid-cols-3 gap-6 text-center">
                    {cities &&
                        cities.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <div className=" card card-body p-5 bg-lime-400">
                                        <p className=" text-red-500">{idx + 1}</p>
                                        <p>{item.geoname_id} - {item.cou_name_en}</p>
                                        <p>{item.ascii_name}</p>
                                        <p>{item.timezone}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </InfiniteScroll>

        </div>
    );
};

export default Home;