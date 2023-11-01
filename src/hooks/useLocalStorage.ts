import { type Dispatch, useEffect, useReducer } from 'react';

const useLocalStorage = <T>(name: string, startingValue: T): [T, Dispatch<T>] => {
    const reducer = (_: T, newData: T): T => {
        localStorage.setItem(name, JSON.stringify(newData));

        return newData;
    };

    const [value, dispatch] = useReducer(
        reducer,
        startingValue
    );

    useEffect(() => {
        const savedValue = localStorage?.getItem(name);

        if (savedValue !== null)
            dispatch(JSON.parse(savedValue) as T);
    }, []);

    return [value, dispatch];
};

export default useLocalStorage;
