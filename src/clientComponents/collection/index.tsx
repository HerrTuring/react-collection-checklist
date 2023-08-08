'use client';

import React from 'react';

import { valueType } from '../../types';

import usePersistentData, { persistModeType } from '../../hooks/usePersistentData';
import Collection, { collectionSharedPropType } from '../../components/collection';

export interface collectionPropType extends collectionSharedPropType {
  name?: string | undefined,
  onClick?: (newState: valueType, itemName: string, newItemState: boolean) => any;
  startingValue?: valueType;
  persistMode?: persistModeType
}

function CollectionComp({
  data,
  name = undefined,
  onClick = () => null,
  className = '',
  itemClassNames = {
    className: '',
    overlayClassName: '',
    imgClassName: '',
    checkBoxClassName: '',
  },
  startingValue = {},
  persistMode = 'none',
}: collectionPropType) {
  const [value, setValue] = usePersistentData<valueType>({
    name,
    defaultValue: startingValue,
    mode: persistMode,
  });

  const click = (newState: valueType, itemName: string, itemValue: boolean) => {
    onClick(newState, itemName, itemValue);

    setValue(newState);
  };

  return (
    <Collection
      data={data}
      className={className}
      itemClassNames={itemClassNames}
      onClick={click}
      value={value}
    />
  );
}

export default CollectionComp;
