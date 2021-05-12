import React, {useEffect} from 'react'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import {setStateProperty, fetchAllDrinks, resetState, fetchDrinksInSafeLimit} from "../redux/drinks_actions";
import Quantity from "./Quantity";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Search = () => {
  const {drinks, selectedDrink, loading, error, quantity} = useSelector(({drinks}) => drinks)
  const dispatch = useDispatch();

  const SAFETY_LIMIT = parseInt(process.env.REACT_APP_SAFETY_LIMIT)
  const selectedDrinkCaffeineLevel = selectedDrink.caffeine_per_serving && selectedDrink.caffeine_per_serving * quantity

  useEffect(() => {
    dispatch(fetchAllDrinks())
  }, [dispatch])

  const handleSelectChange = (selectedOption) => {
    dispatch(setStateProperty({property: 'selectedDrink', payload: selectedOption}))
    dispatch(setStateProperty({property: 'error', payload: null}))
  }

  const handleStateReset = () => {
    dispatch(resetState())
    dispatch(fetchAllDrinks())
  }

  const handleDrinkSubmit = () => {
    dispatch(fetchDrinksInSafeLimit(selectedDrink.value, quantity))
  }

  const options = drinks.map(item => {
    return {
      value: item.id,
      label: item.name,
      caffeine_per_serving: item.safe_level
    }
  })
  return (
    <div>
      <p className="mb-2 font-semibold text-sm">Select your best drink</p>
      <Select value={selectedDrink} isLoading={loading} options={options} onChange={handleSelectChange} />
      <div className="flex justify-between w-full">
        {error && (selectedDrinkCaffeineLevel >= SAFETY_LIMIT || !selectedDrink.caffeine_per_serving) && <p className="text-red-500 font-bold text-xs mt-1 italic">{error}</p>}
        {
          selectedDrink.caffeine_per_serving && <p className="font-bold text-xs mt-1 italic">
          <span className={`block text-right ${selectedDrinkCaffeineLevel >= SAFETY_LIMIT ? 'text-red-500 w-9/12' : 'text-green-500 w-full'}`}>{selectedDrinkCaffeineLevel}mg</span>
          </p>
        }
      </div>

      <p className="mt-6 mb-2 font-semibold text-sm">How many do you want to consume</p>
      <Quantity currentCaffeineLevel={selectedDrinkCaffeineLevel} />

      {
        selectedDrink.caffeine_per_serving && selectedDrinkCaffeineLevel < SAFETY_LIMIT &&
        <div className="mt-6 flex justify-between">
          <button onClick={handleDrinkSubmit} type="submit" className="text-center outline-none w-4/12 md:w-2/12 py-2 px-4 text-sm font-medium rounded text-white bg-pink-500 hover:bg-pink-700">
            {
              loading ?
              <Loader
                className="inline-block"
                type="Bars"
                color="#fff"
                height={20}
                width={20}
              /> :
              'Submit'
            }
          </button>

          <button onClick={handleStateReset} type="submit" className=" w-2/12 xl:w-1/12 py-2 px-4 text-sm font-medium rounded text-white bg-pink-500 hover:bg-pink-700">
            <FontAwesomeIcon className="text-xs" icon={faRedoAlt} />
          </button>
        </div>
      }
    </div>
  )
}

export default Search
