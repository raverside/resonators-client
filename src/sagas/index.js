import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const createRootSaga = (sagas, sagaParams) => function*() {
    yield sagas.map(saga => saga(sagaParams));
};

export const sagas = createRootSaga([
    require('./initSaga').default.saga,
    require('./sessionSaga').default.saga
], {});

export const reducers = combineReducers({
    session: require('../sagas/sessionSaga').default.reducer,
    form: formReducer
});
