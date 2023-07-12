import React from 'react';

import type { itemData } from '../../types';

import styles from './style.module.css';

type itemPropType = {
  data: itemData;
  onClick: (arg0: boolean) => any;
  className?: string;
  overlayClassName?: string;
  imgClassName?: string;
  checkBoxClassName?: string;
  checked?: boolean;
};

function Item({
  data,
  onClick,
  className = '',
  overlayClassName = '',
  imgClassName = '',
  checkBoxClassName = '',
  checked = false,
}: itemPropType) {
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
      {!checked
        ? <div className={`${styles.overlay} ${overlayClassName}`} />
        : <></>}

      <img className={`${styles.image} ${imgClassName}`} alt={name} src={imgSrc} />

      <input name={Math.random().toString()} className={`${styles.checkbox} ${checkBoxClassName}`} type="checkbox" checked={checked} onChange={click} />
    </div>
  );
}

export default Item;
