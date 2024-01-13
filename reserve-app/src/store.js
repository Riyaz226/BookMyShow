import {createStore} from "redux"
import rootred from "./Client/redux/reducers/main"

const store=createStore(
    rootred
);

export default store;