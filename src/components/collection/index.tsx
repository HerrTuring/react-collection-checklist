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
  imgClassName?: string;
  checkBoxClassName?: string;
}

const defaultProps = {
  className: '',
  itemClassName: '',
  imgClassName: '',
  checkBoxClassName: '',
};

function Collection(props: collectionPropType) {
  const {
    data,
    className,
    itemClassName,
    imgClassName,
    checkBoxClassName,
    value,
    onClick,
  } = props;

  const click = (checked: boolean, name: string) => {
    const newValue = { ...value };

    newValue[name] = checked;

    onClick(newValue);
  };

  const Items = () => data.map((item, index) => (
    <Item
      data={item}
      className={itemClassName}
      imgClassName={imgClassName}
      checkBoxClassName={checkBoxClassName}
      key={item.name}
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

Collection.defaultProps = defaultProps;

export default Collection;
