import { combineReducers } from "redux";
import usuarioReducer from "./usuarioReducer";
import publicacionesReducer from "./publicacionesReducer";
import tareasReducer from "./tareasReducer";

export default combineReducers({
  usuarioReducer,
  publicacionesReducer,
  tareasReducer,
});
