import { all, fork } from "redux-saga/effects";
import { watchSongActions } from "./songSaga";
import staticsSaga from "./staticsSaga";

const rootSaga = function* () {
  yield all([
    fork(watchSongActions), 
    fork(staticsSaga)]);
};

export default rootSaga;
