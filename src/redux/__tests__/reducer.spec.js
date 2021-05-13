import {
  SET_STATE_PROPERTY,
  INCREASE_DRINK_QUANTITY,
  DECREASE_DRINK_QUANTITY,
  STATE_RESET
} from "../drinks_action_types";
import {DrinksReducer} from "../drinks_reducer";

describe('Drinks Reducer', () => {
  test('state properties can be updated', () => {
    const payload  = {
      value: 1,
      name: 'Best Drink',
      caffeine_per_serving: 77
    }
    const action = {
      type: SET_STATE_PROPERTY,
      payload: {
        property: 'selectedDrink',
        payload
      }
    }

    expect(DrinksReducer({
      selectedDrink: {}
    }, action)).toEqual({selectedDrink: payload})
  })

  test('increment of quantity', () => {
    const action = {
      type: INCREASE_DRINK_QUANTITY,
    }

    expect(DrinksReducer({
      quantity: 1
    }, action)).toEqual({quantity: 2})
  })

  test('decrement of quantity', () => {
    const action = {
      type: DECREASE_DRINK_QUANTITY,
    }

    expect(DrinksReducer({
      quantity: 3
    }, action)).toEqual({quantity: 2})
  })

  test('state reset', () => {
    const action = {
      type: STATE_RESET,
    }

    expect(DrinksReducer({}, action)).toHaveProperty('response')
  })
})
