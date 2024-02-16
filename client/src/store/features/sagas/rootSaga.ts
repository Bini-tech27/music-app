import { all, fork } from "redux-saga/effects";
import addSaga from "./addSaga";
import songSaga from "./songSaga";
import deleteSaga from "./deleteSaga";
import staticsSaga from "./staticsSaga";
import { updateSaga } from "./updateSaga";

const rootSaga = function* () {
  yield all([
    fork(addSaga),
    fork(songSaga),
    fork(deleteSaga),
    fork(staticsSaga),
    fork(updateSaga),
  ]);
};

export default rootSaga;
