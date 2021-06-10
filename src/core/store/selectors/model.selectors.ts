import { StoreProps } from '../store.types';

export const langSelector = (store: StoreProps) => ({
    lang: store.lang,
});
