import React from 'react';

import type { itemData } from '../../types';

import styles from './style.module.css';

type itemPropType = {
  data: itemData;
  className?: string;
  imgClassName?: string;
  checkBoxClassName?: string;
  onClick: (arg0: boolean) => any;
  checked?: boolean;
};

const defaultProps = {
  className: '',
  imgClassName: '',
  checkBoxClassName: '',
  checked: false,
};

function Item(props: itemPropType) {
  const {
    data, className, imgClassName, checkBoxClassName, checked, onClick,
  } = props;

  const { name, img: imgSrc } = data;

  const click = () => {
    onClick(!(checked as boolean));
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={click}
      onKeyDown={click}
      role="button"
      tabIndex={0}
    >
      <img className={imgClassName} alt={name} src={imgSrc} />

      <input className={checkBoxClassName} type="checkbox" checked={checked} onClick={click} />
    </div>
  );
}

Item.defaultProps = defaultProps;

export default Item;
