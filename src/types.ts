export type clickType = 'openUrl' | 'check';

export type itemData = {
    name: string;
    path: string;
    img: string;
};

export type standardsType = {
    clickMode?: clickType,
    baseImgUrl?: string,
};
