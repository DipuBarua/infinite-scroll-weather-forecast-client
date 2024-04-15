import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import CitiesTable from "./CitiesTable";

const Home = () => {
    const [cities, fetchNextPage, hasNextPage, refetch] = useInfiniteScroll();

    console.log('home city', cities);
    return (
        <div>

            {/* scroll  */}
            <InfiniteScroll
                dataLength={cities ? cities.length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<div>loading....</div>}>

                {/* table  */}
                <div className="overflow-x-auto mt-24">
                    <table className="table table-xs table-zebra">

                        <thead className=" text-xl">
                            <tr>
                                <th>SL.</th>
                                <th>City Name</th>
                                <th>Country</th>
                                <th>Timezone</th>
                                <th>Population</th>
                                <th>Ascii Name</th>
                                <th>Longitude/Latitude</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cities &&
                                cities.map((item, idx) => <CitiesTable key={idx}
                                    index={idx}
                                    item={item}
                                    refetch={refetch}
                                ></CitiesTable>)
                            }
                        </tbody>

                    </table>
                </div>

            </InfiniteScroll>

        </div>
    );
};

export default Home;