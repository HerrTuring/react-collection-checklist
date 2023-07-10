import React, { useState } from 'react';

import type { itemData, standardsType } from '../../types';

import styles from './style.module.css';

type itemPropType = {
  data: itemData;
  standards?: standardsType;
  className?: string;
  imgClassName?: string;
  checkBoxClassName?: string
};

const defaultProps = {
  standards: {
    clickMode: 'check',
    baseImgUrl: '',
  },
  className: '',
  imgClassName: '',
  checkBoxClassName: '',
};

function Item(props: itemPropType) {
  const {
    data, standards, className, imgClassName, checkBoxClassName,
  } = props;

  const { baseImgUrl, clickMode } = standards as standardsType;

  const [checked, setChecked] = useState<boolean>(true);

  const { name, path, img: imgSrc } = data;

  const onClick = () => {
    window.location.href = path;
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <img className={imgClassName} alt={name} src={`${baseImgUrl}${imgSrc}`} />

      {clickMode === 'check'
        ? <input className={checkBoxClassName} type="checkbox" checked={checked} onClick={() => setChecked(!checked)} />
        : <></>}
    </div>
  );
}

Item.defaultProps = defaultProps;

export default Item;
