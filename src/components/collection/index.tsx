import React from 'react';

import { itemDataType, valueType } from '../../types';

import Item, { itemClassNamesType } from '../item';

import styles from './style.module.css';

export type collectionPropType = {
  data: Array<itemDataType>,
  value: valueType ;
  onClick: (newState: valueType) => any;
  className?: string,
  itemClassNames?: itemClassNamesType;
}

function Collection({
  data,
  className = '',
  itemClassNames = {
    className: '',
    overlayClassName: '',
    imgClassName: '',
    checkBoxClassName: '',
  },
  value,
  onClick,
}: collectionPropType) {
  const {
    className: itemClassName,
    overlayClassName,
    imgClassName,
    checkBoxClassName,
  } = itemClassNames;

  const click = (checked: boolean, name: string) => {
    const newValue = { ...value };

    newValue[name] = checked;

    onClick(newValue);
  };

  const Items = () => data.map((item) => {
    const { name } = item;
    return (
      <Item
        data={item}
        className={itemClassName}
        overlayClassName={overlayClassName}
        imgClassName={imgClassName}
        checkBoxClassName={checkBoxClassName}
        key={name}
        checked={value[name] ?? false}
        onClick={(checked: boolean) => click(checked, name)}
      />
    );
  });

  return (
    <div className={`${styles.container} ${className}`}>
      <Items />
    </div>
  );
}

export default Collection;
