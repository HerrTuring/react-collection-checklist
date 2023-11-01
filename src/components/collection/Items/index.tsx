import { type ReactElement } from 'react';

import Item, { type itemClassNamesType } from '../../item';
import { type valueType, type itemDataType } from '../../../types';

interface itemsPropType {
    itemClassNames: itemClassNamesType
    data: itemDataType[],
    value: valueType,
    click: (checked: boolean, name: string) => void,
    noOverlay: boolean,
    noCheckbox: boolean
};

function Items ({
    itemClassNames,
    data,
    value,
    click,
    noOverlay,
    noCheckbox
}: itemsPropType): ReactElement[] {
    return data.map((item) => {
        const { name } = item;
        return (
            <Item
                {...itemClassNames}
                data={item}
                key={name}
                checked={value[name] ?? false}
                onClick={(checked: boolean) => { click(checked, name); }}
                noOverlay={noOverlay}
                noCheckbox={noCheckbox}
            />
        );
    });
}

export default Items;
