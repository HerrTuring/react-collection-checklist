import React from 'react';

import type { itemDataType } from '../../types';

import styles from './style.module.css';

export type itemClassNamesType = {
  className?: string;
  overlayClassName?: string;
  imgClassName?: string;
  checkBoxClassName?: string;
}

// Prop types that are the same in both server and client components.
export interface itemSharedPropType extends itemClassNamesType {
  data: itemDataType;
  noOverlay?: boolean;
  noCheckbox?: boolean;
}

export interface itemPropType extends itemSharedPropType {
  onClick: (newState: boolean) => any;
  checked?: boolean;
}

function Item({
  data,
  onClick,
  className = '',
  overlayClassName = '',
  imgClassName = '',
  checkBoxClassName = '',
  checked = false,
  noOverlay = false,
  noCheckbox = false,
}: itemPropType) {
  const { name, img: imgSrc } = data;

  const click = () => {
    onClick(!(checked as boolean));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Space'].includes(event.code))
      click();
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={click}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
    >
      {!checked && !noOverlay
        ? <div className={`${styles.overlay} ${overlayClassName}`} />
        : <></>}

      <img className={`${styles.image} ${imgClassName}`} alt={name} src={imgSrc} />

      {!noCheckbox
        ? <input name={Math.random().toString()} className={`${styles.checkbox} ${checkBoxClassName}`} type="checkbox" checked={checked} onChange={click} />
        : <></>}
    </div>
  );
}

export default Item;
