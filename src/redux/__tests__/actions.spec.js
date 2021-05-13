import { fetchAllDrinks, fetchDrinksInSafeLimit } from "../drinks_actions";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as Service from '../service'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
  test ('gets all drinks success', async() => {
    const store = mockStore({})
    const mockResponse = [
      {id: 1, name: 'Drink 1', safe_level: 77},
      {id: 2, name: 'Drink 2', safe_level: 77},
      {id: 3, name: 'Drink 3', safe_level: 77},
    ]

    const expectedActions = [
      {
        type: 'SET_STATE_PROPERTY',
        payload: { property: 'loading', payload: true }
      },
      {
        type: 'SET_STATE_PROPERTY',
        payload: { property: 'drinks', payload: mockResponse }
      },
      {
        type: 'SET_STATE_PROPERTY',
        payload: { property: 'loading', payload: false }
      }
    ]

    const mock = jest.spyOn(Service, 'getAllDrinks')
    mock.mockImplementation(() => Promise.resolve({data: mockResponse}))

    await store.dispatch(fetchAllDrinks());
    expect(store.getActions()).toEqual(expectedActions)
  })

  test ('gets all drinks in safe limit', async() => {
    const store = mockStore({})

    const mockResponse = [
      {option1: []},
      {option2: []},
      {option3: []}
    ]

    const expectedActions = [
      {
        type: 'SET_STATE_PROPERTY',
        payload: { property: 'loading', payload: true }
      },
      {
        type: 'SET_STATE_PROPERTY',
        payload: { property: 'response', payload: mockResponse }
      },
      {
        type: 'SET_STATE_PROPERTY',
        payload: { property: 'loading', payload: false }
      }
    ]

    const mock = jest.spyOn(Service, 'getDrinksAtSafeLimit')
    mock.mockImplementation(() => Promise.resolve({ data: mockResponse }))

    await store.dispatch(fetchDrinksInSafeLimit());
    expect(store.getActions()).toEqual(expectedActions)
  })
})
