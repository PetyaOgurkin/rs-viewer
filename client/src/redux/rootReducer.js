import { combineReducers } from "redux";
import { adminReducer } from "./admin/reducers";
import { authReducer } from "./auth/reducers";
import { catalogReducer } from "./catalog/reducers";
import { mapReducer } from "./map/reducers";
import { timeLineReducer } from "./timeline/reducers";


export const rootReducer = combineReducers({
    catalog: catalogReducer,
    map: mapReducer,
    auth: authReducer,
    admin: adminReducer,
    timeLine: timeLineReducer
})