import { type ReactElement } from 'react';
import { type itemDataType, type valueType } from '../../types';

import { type itemClassNamesType } from '../item';

import Items from './Items';

import styles from './style.module.css';

export interface collectionSharedPropType {
    data: itemDataType[],
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
        checkBoxClassName: ''
    },
    value,
    onClick,
    noOverlay = false,
    noCheckbox = false
}: collectionPropType): ReactElement {
    const click = (checked: boolean, name: string): void => {
        const newValue = { ...value };

        newValue[name] = checked;

        onClick(newValue, name, checked);
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <Items
                itemClassNames={itemClassNames}
                data={data}
                value={value}
                click={click}
                noOverlay={noOverlay}
                noCheckbox={noCheckbox}
            />
        </div>
    );
}

export default Collection;
