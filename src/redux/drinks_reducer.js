import {
  SET_STATE_PROPERTY,
  INCREASE_DRINK_QUANTITY,
  DECREASE_DRINK_QUANTITY,
  STATE_RESET
} from "./drinks_action_types";

export const initialState = {
  loading: false,
  drinks: [],
  selectedDrink: {},
  error: null,
  quantity: 1,
  response: null
}

export const DrinksReducer = (state = initialState, action) => {
  if (action.type === SET_STATE_PROPERTY) {
    return {
      ...state,
      [action.payload.property]: action.payload.payload
    }
  }

  if (action.type === STATE_RESET) {
    return {
      ...state,
      loading: false,
      drinks: [],
      selectedDrink: {},
      error: null,
      quantity: 1,
      response: null
    }
  }

  if (action.type === INCREASE_DRINK_QUANTITY) {
    return {
      ...state,
      quantity: state.quantity + 1
    }
  }

  if (action.type === DECREASE_DRINK_QUANTITY) {
    return {
      ...state,
      quantity: state.quantity - 1
    }
  }


  return state
}
