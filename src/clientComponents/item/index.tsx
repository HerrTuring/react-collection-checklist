'use client';

import React from 'react';

import { Item } from '../../components';
import { itemSharedPropTypes } from '../../components/item';

import usePersistentData, { persistModeType } from '../../hooks/usePersistentData';

export interface clientItemPropType extends itemSharedPropTypes {
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

    (setChecked as React.Dispatch<boolean>)(newState);
  };

  return (
    <Item
      data={data}
      onClick={click}
      className={className}
      overlayClassName={overlayClassName}
      imgClassName={imgClassName}
      checkBoxClassName={checkBoxClassName}
      checked={checked as boolean}
    />
  );
}

export default ItemComp;
