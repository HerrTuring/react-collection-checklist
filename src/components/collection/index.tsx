import React from 'react';

import { itemData } from '../../types';

import Item from '../item';

import styles from './style.module.css';

type valueType = {
  [key: string]: boolean
}

type collectionPropType = {
  data: Array<itemData>,
  value: valueType ;
  onClick: (newState: valueType) => any;
  className?: string,
  itemClassName?: string;
  overlayClassName?: string;
  imgClassName?: string;
  checkBoxClassName?: string;
}

function Collection({
  data,
  className = '',
  overlayClassName = '',
  itemClassName = '',
  imgClassName = '',
  checkBoxClassName = '',
  value,
  onClick,
}: collectionPropType) {
  const click = (checked: boolean, name: string) => {
    const newValue = { ...value };

    newValue[name] = checked;

    onClick(newValue);
  };

  const Items = () => data.map((item, index) => (
    <Item
      data={item}
      className={itemClassName}
      overlayClassName={overlayClassName}
      imgClassName={imgClassName}
      checkBoxClassName={checkBoxClassName}
      key={`${item.name}${index}`}
      checked={value[index] ?? false}
      onClick={(checked: boolean) => click(checked, index.toString())}
    />
  ));

  return (
    <div className={`${styles.container} ${className}`}>
      <Items />
    </div>
  );
}

export default Collection;
