import { useInfiniteQuery } from "@tanstack/react-query";

const getAllCities = async ({ pageParam = 0 }) => {
    const res = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${pageParam}`)
    const data = await res.json();
    // console.log(data);

    return { ...data, prevOffset: pageParam }
}


const useInfiniteScroll = () => {

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['records'],
        queryFn: getAllCities,
        getNextPageParam: (lastPage) => {
            if (lastPage.prevOffset + 10 > lastPage.total_count) {
                return false;
            }
            return (lastPage.prevOffset + 10);
        }
    });

    const cities = data?.pages.reduce((acc, page) => {
        return [...acc, ...page.results]
    }, [])
    console.log("cities res:", cities);


    return [cities, fetchNextPage, hasNextPage];
};

export default useInfiniteScroll;