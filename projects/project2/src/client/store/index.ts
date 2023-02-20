import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootReducer } from "../reducers/index";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["products"],
};

const myPersistReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(myPersistReducer, applyMiddleware(thunk));

// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
