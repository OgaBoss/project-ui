import {
  SET_STATE_PROPERTY,
  DECREASE_DRINK_QUANTITY,
  INCREASE_DRINK_QUANTITY,
  STATE_RESET
} from "./drinks_action_types";

import {getAllDrinks, getDrinksAtSafeLimit} from './service'

export const fetchAllDrinks = () => {
  return async (dispatch) => {
    try {
      dispatch(setStateProperty({property: 'loading', payload: true}))
      const response = await getAllDrinks();
      dispatch(setStateProperty({property: 'drinks', payload: response.data}))
      dispatch(setStateProperty({property: 'loading', payload: false}))
    } catch (e) {
      dispatch(setStateProperty({property: 'error', payload: e}))
    }
  }
}

export const fetchDrinksInSafeLimit = (drink_id, quantity) => {
  return async (dispatch) => {
    try {
      dispatch(setStateProperty({property: 'loading', payload: true}))
      const response = await getDrinksAtSafeLimit(drink_id, quantity);
      dispatch(setStateProperty({property: 'response', payload: response.data}))
      dispatch(setStateProperty({property: 'loading', payload: false}))
    } catch (e) {
      dispatch(setStateProperty({property: 'error', payload: e}))
    }
  }
}

export const setStateProperty = ({payload, property}) => ({
  type: SET_STATE_PROPERTY,
  payload: {
    property,
    payload,
  }
});

export const decreaseDrinkQuantity = () => ({
  type: DECREASE_DRINK_QUANTITY,
});

export const increaseDrinkQuantity = () => ({
  type: INCREASE_DRINK_QUANTITY,
});

export const resetState = () => ({
  type: STATE_RESET,
});
