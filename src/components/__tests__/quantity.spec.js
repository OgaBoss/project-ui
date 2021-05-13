import React from 'react'
import { Provider } from 'react-redux'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { configureStore } from "@reduxjs/toolkit";
import Quantity from "../Quantity";
import { DrinksReducer } from '../../redux/drinks_reducer'

function renderWithRedux(
  ui,
  store
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}

const preloadedState = {
  quantity: 3,
  selectedDrink: {
    id: 12,
    value: 'Drink1',
    caffeine_per_serving: 77
  }
}

let Store;
beforeEach(() => {
  Store = configureStore({
    reducer: {
      drinks: DrinksReducer
    },
    preloadedState: {
      drinks: preloadedState
    },
  })
})

describe('Quantity Component', () => {
  test('increment', async () => {
    const {getByText} = renderWithRedux(<Quantity currentCaffeineLevel={200} />, Store);
    expect(Store.getState().drinks.quantity).toBe(3);

    const increment = getByText('+')
    fireEvent.click(increment)

    await waitFor(() => {
      expect(Store.getState().drinks.quantity).toBe(4);
    })
  })

  test('decrement', async () => {
    const {getByText} = renderWithRedux(<Quantity currentCaffeineLevel={200} />, Store);

    const decrement = getByText('-')
    fireEvent.click(decrement)

    await waitFor(() => {
      expect(Store.getState().drinks.quantity).toBe(2);
    })
  })
});
