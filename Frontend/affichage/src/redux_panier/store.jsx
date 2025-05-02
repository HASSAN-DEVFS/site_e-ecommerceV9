

import { configureStore } from "@reduxjs/toolkit";
import PanierReducer from "./PanierSlice";

export const store = configureStore({
  reducer: {
    panier: PanierReducer,  
  },
});

export default store;
