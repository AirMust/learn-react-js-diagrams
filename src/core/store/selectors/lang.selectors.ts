import { StoreProps } from '../store.types';

export const modelSelector = (store: StoreProps) => ({
    model: store.model,
});
