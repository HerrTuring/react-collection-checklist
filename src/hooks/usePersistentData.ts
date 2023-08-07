import { useState } from 'react';
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

  switch (mode) {
    case 'localStorage':
      return useLocalStorage<T>(name as string, defaultValue);

    case 'none':
    default:
      return useState<T>(defaultValue);
  }
};

export default usePersistentData;
