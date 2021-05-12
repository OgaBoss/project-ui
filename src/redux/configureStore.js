import { configureStore } from "@reduxjs/toolkit";
import {DrinksReducer} from "./drinks_reducer"

const Store = configureStore({
  reducer: {
    drinks: DrinksReducer
  }
})

export default Store
