'use client';

import React from 'react';

import { Item } from '../../components';
import { itemClassNamesType } from '../../components/item';

import useLocalStorage from '../../hooks/useLocalStorage';

import type { itemDataType } from '../../types';

export interface clientItemPropType extends itemClassNamesType {
  name: string,
  data: itemDataType;
  onClick?: (newState: boolean) => any;
}

function ItemComp({
  name,
  data,
  onClick = () => null,
  className = '',
  overlayClassName = '',
  imgClassName = '',
  checkBoxClassName = '',
}: clientItemPropType) {
  const [checked, setChecked] = useLocalStorage<boolean>(name, false);

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
