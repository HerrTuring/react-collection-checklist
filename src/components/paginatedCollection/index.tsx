import React from 'react';

import Collection, { collectionPropType } from '../collection';

import styles from './style.module.css';

export type paginationButtonsClassNamesType = {
  buttonClassName?: string;
  buttonNotFirstClassName?: string;
  buttonSelectedClassName?: string;
}

export interface paginationButtonsPropType extends paginationButtonsClassNamesType {
  paginationIndex: number,
  paginationQuantity: number,
  onPaginationClick: (newState: number) => any,
}

function PaginationButtons({
  paginationIndex,
  paginationQuantity,
  onPaginationClick,
  buttonClassName = '',
  buttonNotFirstClassName = '',
  buttonSelectedClassName = '',
}: paginationButtonsPropType) {
  const html = [];

  for (let i = 0; i < paginationQuantity; i++) {
    const page = i + 1;

    let className = `${styles.button} ${buttonClassName}`;
    if (page !== 1)
      className += ` ${styles.buttonNotFirst} ${buttonNotFirstClassName}`;

    if (page === paginationIndex)
      className += ` ${styles.selectedButton} ${buttonSelectedClassName}`;

    html.push(<button onClick={() => onPaginationClick(page)} key={Math.random()} type="button" className={className}>{i + 1}</button>);
  }

  return html;
}

export interface paginatedCollectionPropType extends collectionPropType {
  paginationIndex: number;
  onPaginationClick: (newState: number) => any;
  pageLimit?: number;
  collectionClassName?: string,
  buttonsContainerClassName?: string,
  paginationButtonsClassNames?: paginationButtonsClassNamesType
  noOverlay?: boolean;
  noCheckbox?: boolean;
}

function PaginatedCollection({
  data,
  className = '',
  collectionClassName = '',
  buttonsContainerClassName = '',
  itemClassNames = {
    className: '',
    overlayClassName: '',
    imgClassName: '',
    checkBoxClassName: '',
  },
  paginationButtonsClassNames = {
    buttonClassName: '',
    buttonNotFirstClassName: '',
    buttonSelectedClassName: '',
  },
  value,
  onClick,
  pageLimit = 20,
  paginationIndex = 1,
  onPaginationClick,
  noOverlay = false,
  noCheckbox = false,
}: paginatedCollectionPropType) {
  const {
    buttonClassName,
    buttonNotFirstClassName,
    buttonSelectedClassName,
  } = paginationButtonsClassNames;

  const paginatedData = [...data].splice(
    (paginationIndex - 1) * pageLimit,
    pageLimit,
  );

  const paginationQuantity = Math.ceil(data.length / pageLimit);

  return (
    <div className={`${styles.container} ${className}`}>
      <Collection
        data={paginatedData}
        className={collectionClassName}
        itemClassNames={itemClassNames}
        value={value}
        onClick={onClick}
        noOverlay={noOverlay}
        noCheckbox={noCheckbox}
      />

      <div className={`${styles.paginationBar} ${buttonsContainerClassName}`}>
        <PaginationButtons
          paginationIndex={paginationIndex}
          paginationQuantity={paginationQuantity}
          onPaginationClick={onPaginationClick}
          buttonClassName={buttonClassName}
          buttonNotFirstClassName={buttonNotFirstClassName}
          buttonSelectedClassName={buttonSelectedClassName}
        />
      </div>
    </div>
  );
}

export default PaginatedCollection;
