const mockResponse = [
  {id: 1, name: 'Drink 1', safe_level: 77},
  {id: 2, name: 'Drink 2', safe_level: 77},
  {id: 3, name: 'Drink 3', safe_level: 77},
]

export const getAllDrinks = jest.fn(() => Promise.resolve({ data: mockResponse}));
