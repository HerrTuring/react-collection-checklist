import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';

export type persistModeType = 'none' | 'localStorage';

export type persistDataParameters<T> = {
    defaultValue: T;
    name?: string;
    mode?: persistModeType;
}

const usePersistentData = <T>({
  defaultValue,
  name,
  mode = 'none',
}: persistDataParameters<T>) => {
  if (mode === 'localStorage' && name == null)
    throw new Error('Parameter name must be set when mode is set to "localStorage".');

  let returnData = [];
  switch (mode) {
    case 'localStorage':
      returnData = useLocalStorage<T>(name as string, defaultValue);
      break;

    case 'none':
    default:
      returnData = useState<T>(defaultValue);
      break;
  }

  return returnData as [T, React.Dispatch<T>];
};

export default usePersistentData;
