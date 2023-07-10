import React from 'react';

import { itemData, standardsType } from '../../types';

import Item from '../item';

import styles from './style.module.css';

type collectionPropType = {
  data: Array<itemData>,
  standards?: standardsType,
  className?: string,
  itemClassName?: string;
  imgClassName?: string;
  checkBoxClassName?: string
}

const defaultProps = {
  standards: {
    clickMode: 'check',
    baseImgUrl: '',
  },
  className: '',
  itemClassName: '',
  imgClassName: '',
  checkBoxClassName: '',
};

function Collection(props: collectionPropType) {
  const {
    data,
    standards,
    className,
    itemClassName,
    imgClassName,
    checkBoxClassName,
  } = props;

  const Items = () => data.map((item) => (
    <Item
      data={item}
      standards={standards}
      className={itemClassName}
      imgClassName={imgClassName}
      checkBoxClassName={checkBoxClassName}
      key={item.name}
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
