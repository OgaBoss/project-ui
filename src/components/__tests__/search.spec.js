import React from 'react'
import { Provider } from 'react-redux'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { configureStore } from "@reduxjs/toolkit";
import { DrinksReducer } from '../../redux/drinks_reducer'
import Search from "../Search";
import selectEvent from 'react-select-event'
import * as Service from '../../redux/service'

function renderWithRedux(
  ui,
  store
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}

const mockResponse = [
  {id: 1, name: 'Drink 1', safe_level: 77},
  {id: 2, name: 'Drink 2', safe_level: 77},
  {id: 3, name: 'Drink 3', safe_level: 77},
]

const mockResponse2 = {
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

const preloadedState = {
  quantity: 1,
  selectedDrink: {},
  response: null,
  drinks: [
    {
      id: 1,
      name: 'Drink1',
      safe_level: 86
    },
    {
      id: 2,
      name: 'Drink2',
      safe_level: 100
    },
  ]
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

  const mock = jest.spyOn(Service, 'getAllDrinks')
  mock.mockImplementation(() => Promise.resolve({data: mockResponse}))
})

describe('Search', () => {
  test('user can select drink', async () => {
    const {getByTestId, getByLabelText, getByText} = renderWithRedux(<Search />, Store);
    expect(getByTestId('drinks-select')).toHaveFormValues({drinks: ''})

    // select one value
    await selectEvent.select(getByLabelText('Select your best drink'), mockResponse[0].name)
    expect(getByTestId('drinks-select')).toHaveFormValues({drinks: `${mockResponse[0].id}`})

    await waitFor(() => {
      expect(Store.getState().drinks.selectedDrink.value).toBe(1);
      expect(getByTestId('caffeine-level')).toBeInTheDocument()
    })
  })

  test('submit drink selection', async () => {
    const {getByTestId, getByLabelText} = renderWithRedux(<Search />, Store);

    // select one value
    await selectEvent.select(getByLabelText('Select your best drink'), mockResponse[0].name)
    expect(getByTestId('drinks-select')).toHaveFormValues({drinks: `${mockResponse[0].id}`})

    const mock = jest.spyOn(Service, 'getDrinksAtSafeLimit')
    mock.mockImplementation(() => Promise.resolve({ data: mockResponse2 }))

    const submit = getByTestId('submit-drink')
    fireEvent.click(submit)

    await waitFor(() => {
      expect(Object.keys(Store.getState().drinks.response).length).toBe(3);
      expect(getByTestId('caffeine-level')).toBeInTheDocument()
    })

  })
})
