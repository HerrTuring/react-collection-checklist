'use client';
import { type ReactElement } from 'react';

import { type valueType } from '../../types';
import usePersistentData, { type persistModeType } from '../../hooks/usePersistentData';
import Collection, { type collectionSharedPropType } from '../../components/collection';

export interface collectionPropType extends collectionSharedPropType {
    name?: string,
    onClick?: (newState: valueType, itemName: string, newItemState: boolean) => any;
    startingValue?: valueType;
    persistMode?: persistModeType
}

function CollectionComp({
    data,
    name = '',
    onClick = () => null,
    className = '',
    itemClassNames = {
        className: '',
        overlayClassName: '',
        imgClassName: '',
        checkBoxClassName: ''
    },
    startingValue = {},
    persistMode = 'none'
}: collectionPropType): ReactElement {
    const [value, setValue] = usePersistentData<valueType>({
        name,
        defaultValue: startingValue,
        mode: persistMode
    });

    const click = (newState: valueType, itemName: string, itemValue: boolean): void => {
        onClick(newState, itemName, itemValue);

        setValue(newState);
    };

    return (
        <Collection
            data={data}
            className={className}
            itemClassNames={itemClassNames}
            onClick={click}
            value={value}
        />
    );
}

export default CollectionComp;
