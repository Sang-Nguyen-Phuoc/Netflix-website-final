import { useState, useEffect } from 'react'


const useFetch = (url, initialValues = []) => {
    const [data, setData] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [url]);
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    };
    return { data, isLoading };
}

export default useFetch;