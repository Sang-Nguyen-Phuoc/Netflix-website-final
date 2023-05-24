import { useState } from 'react'
import { useEffect } from 'react'

const useFetch = (url, initialValues = []) => {
    const [data, setData] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
            setError(error);
        }
    };
    return { data, isLoading, error };
}

export default useFetch;