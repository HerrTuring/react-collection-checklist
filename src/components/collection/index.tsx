import React from 'react';

import { itemDataType, valueType } from '../../types';

import Item, { itemClassNamesType } from '../item';

import styles from './style.module.css';

export type collectionSharedPropType = {
  data: Array<itemDataType>,
  className?: string,
  itemClassNames?: itemClassNamesType;
  noOverlay?: boolean;
  noCheckbox?: boolean;
}

// Prop types that are the same in both server and client components.
export interface collectionPropType extends collectionSharedPropType {
  value: valueType;
  onClick: (newState: valueType, itemName: string, newItemState: boolean) => any;
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
  noOverlay = false,
  noCheckbox = false,
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

    onClick(newValue, name, checked);
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
        noOverlay={noOverlay}
        noCheckbox={noCheckbox}
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
