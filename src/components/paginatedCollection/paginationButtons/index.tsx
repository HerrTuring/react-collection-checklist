import { type ReactElement } from 'react';

import styles from './style.module.css';

export interface paginationButtonsClassNamesType {
    buttonClassName?: string;
    buttonNotFirstClassName?: string;
    buttonSelectedClassName?: string;
}

export interface paginationButtonsPropType
    extends paginationButtonsClassNamesType {
    paginationIndex: number;
    paginationQuantity: number;
    onPaginationClick: (newState: number) => any;
}

function PaginationButtons({
    paginationIndex,
    paginationQuantity,
    onPaginationClick,
    buttonClassName = '',
    buttonNotFirstClassName = '',
    buttonSelectedClassName = ''
}: paginationButtonsPropType): ReactElement[] {
    const html = [];

    for (let i = 0; i < paginationQuantity; i++) {
        const page = i + 1;

        let className = `${styles.button} ${buttonClassName}`;
        if (page !== 1)
            className += ` ${styles.buttonNotFirst} ${buttonNotFirstClassName}`;

        if (page === paginationIndex)
            className += ` ${styles.selectedButton} ${buttonSelectedClassName}`;

        html.push(
            <button
                onClick={() => onPaginationClick(page)}
                key={Math.random()}
                type="button"
                className={className}
            >
                {i + 1}
            </button>
        );
    }

    return html;
}

export default PaginationButtons;
