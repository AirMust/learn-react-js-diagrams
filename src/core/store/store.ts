import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = composeWithDevTools(
    applyMiddleware(
        save({
            states: ['auth.userToken', 'theme.type', 'lang'],
            namespace: 'ER',
            namespaceSeparator: '::',
        }),
        thunk,
    ),
)(createStore);

export const store = createStoreWithMiddleware(
    rootReducer,
    load({
        states: ['auth.userToken', 'theme.type', 'lang'],
        namespace: 'ER',
        namespaceSeparator: '::',
    }),
);
