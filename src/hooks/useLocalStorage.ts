import { useReducer } from 'react';

const initializer = <T>(name: string, startingValue: T) => {
  const savedValue = localStorage.getItem(name);

  if (savedValue !== null)
    return JSON.parse(savedValue) as T;

  return startingValue;
};

const reducer = <T> (name: string, newData: T) => {
  localStorage.setItem(name, JSON.stringify(newData));

  console.log(localStorage.getItem(name));

  return newData;
};

const useLocalStorage = <T>(name: string, startingValue: T) => useReducer(
  (_: T, newState: T) => reducer<T>(name, newState),
  startingValue,
  () => initializer<T>(name, startingValue),
);

export default useLocalStorage;
