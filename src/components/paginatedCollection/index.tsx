import { type ReactElement } from 'react';

import Collection, { type collectionPropType } from '../collection';
import PaginationButtons, { type paginationButtonsClassNamesType } from './paginationButtons';

import styles from './style.module.css';

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
        checkBoxClassName: ''
    },
    paginationButtonsClassNames = {
        buttonClassName: '',
        buttonNotFirstClassName: '',
        buttonSelectedClassName: ''
    },
    value,
    onClick,
    pageLimit = 20,
    paginationIndex = 1,
    onPaginationClick,
    noOverlay = false,
    noCheckbox = false
}: paginatedCollectionPropType): ReactElement {
    const paginatedData = [...data].splice(
        (paginationIndex - 1) * pageLimit,
        pageLimit
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
                    {...paginationButtonsClassNames}
                />
            </div>
        </div>
    );
}

export default PaginatedCollection;
