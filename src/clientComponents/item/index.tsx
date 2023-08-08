'use client';

import React from 'react';

import usePersistentData, { persistModeType } from '../../hooks/usePersistentData';
import Item, { itemSharedPropType } from '../../components/item';

export interface clientItemPropType extends itemSharedPropType {
  name?: string | undefined,
  onClick?: (newState: boolean) => any;
  startingValue?: boolean;
  persistMode?: persistModeType;
}

function ItemComp({
  data,
  name = undefined,
  onClick = () => null,
  className = '',
  overlayClassName = '',
  imgClassName = '',
  checkBoxClassName = '',
  startingValue = false,
  persistMode = 'none',
}: clientItemPropType) {
  const [checked, setChecked] = usePersistentData<boolean>({
    name,
    mode: persistMode,
    defaultValue: startingValue,
  });

  const click = (newState: boolean) => {
    onClick(newState);

    setChecked(newState);
  };

  return (
    <Item
      data={data}
      onClick={click}
      className={className}
      overlayClassName={overlayClassName}
      imgClassName={imgClassName}
      checkBoxClassName={checkBoxClassName}
      checked={checked}
    />
  );
}

export default ItemComp;
