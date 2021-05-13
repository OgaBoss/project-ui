import React from 'react'
import { Provider } from 'react-redux'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { configureStore } from "@reduxjs/toolkit";
import { DrinksReducer } from '../../redux/drinks_reducer'
import Response from "../Response";

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
  quantity: 1,
  selectedDrink: {
    id: 12,
    value: 'Drink1',
    caffeine_per_serving: 77
  },
  response: {
    option1: {
      quantity: 3,
      drink: 'Drink1',
      caffeine_level: 77
    },
    option2: [
      {
        quantity: 2,
        drink: 'Drink2',
        caffeine_level: 86
      },
      {
        quantity: 5,
        drink: 'Drink3',
        caffeine_level: 50
      },
    ],
    option3: [],
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

describe('Response Component', () => {
  test('that response is displayed accordingly', () => {
    const {getByText} = renderWithRedux(<Response />, Store);
    expect(Object.keys(Store.getState().drinks.response).length).toBe(3);

    expect(getByText('Drinks Option 1')).toBeInTheDocument()

    screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === "Caffeine Consumed: 77 mg";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));

      return nodeHasText && childrenDontHaveText;
    });

    expect(getByText('Drinks Option 2')).toBeInTheDocument()
    expect(getByText('Drinks Option 3')).toBeInTheDocument()
  })

  test('close button works', async () => {
    const {getByTestId, container} = renderWithRedux(<Response />, Store);
    const close = getByTestId('close')

    fireEvent.click(close)

    await waitFor(() => {
      expect(container.firstChild.firstChild).toBeNull()
    })
  })
})
