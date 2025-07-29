import { useEffect, useState } from "react";
import type { CommentsResponse } from "../Types/Types";

function useFetch(path: string) {
    const [data, setData] = useState<CommentsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetching = async (path: string) => {
        try {
            const res = await fetch(path);

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            const data = await res.json();

            setData(data);
            setLoading(false);
        } catch (error) {
            throw new Error(`Something went wrong, ${error}`);
        }
    }

    useEffect(() => {
        fetching(path);
    }, [path]);

    return { data, loading, render: fetching };
}

export default useFetch