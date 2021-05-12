import { httpClient } from "../api";

export const getAllDrinks = async () => {
  return await httpClient.get(`${process.env.REACT_APP_API_URL}drinks`)
};

export const getDrinksAtSafeLimit = async (drink_id, quantity) => {
  return await httpClient.get(`${process.env.REACT_APP_API_URL}drinks/${drink_id}/safe_limit_check`, {
    params: {
      quantity,
    }
  })
};
