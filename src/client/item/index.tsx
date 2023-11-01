'use client';
import { type ReactElement } from 'react';

import usePersistentData, { type persistModeType } from '../../hooks/usePersistentData';
import Item, { type itemSharedPropType } from '../../components/item';

export interface clientItemPropType extends itemSharedPropType {
    name?: string,
    onClick?: (newState: boolean) => any;
    startingValue?: boolean;
    persistMode?: persistModeType;
}

function ItemComp({
    data,
    name = '',
    onClick = () => null,
    className = '',
    overlayClassName = '',
    imgClassName = '',
    checkBoxClassName = '',
    startingValue = false,
    persistMode = 'none'
}: clientItemPropType): ReactElement {
    const [checked, setChecked] = usePersistentData<boolean>({
        name,
        mode: persistMode,
        defaultValue: startingValue
    });

    const click = (newState: boolean): void => {
        onClick(newState);

        setChecked(newState);
    };

    return (
        <Item
            data={data}
            onClick={click}
            className={className}
            overlayClassName={overlayClassName}
            imgClassName={imgClassName}
            checkBoxClassName={checkBoxClassName}
            checked={checked}
        />
    );
}

export default ItemComp;
