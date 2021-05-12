import React from 'react'
import styles from '../styles/style.module.css'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from 'react-redux'
import {resetState, fetchAllDrinks} from "../redux/drinks_actions";
import Option from "./_includes/Options";
const Response = () => {
  const {response, selectedDrink, quantity} = useSelector(({drinks}) => drinks)
  const dispatch = useDispatch();

  const handleStateReset = () => {
    dispatch(resetState())
    dispatch(fetchAllDrinks())
  }

  if (response) {
    return (
      <div>
        <div className={`${styles.overlay} absolute left-0 top-0 w-full min-h-screen z-10`} />
        <div className="mobile-side-menu bg-white absolute p-8 pb-6 right-0 top-0 w-full lg:w-2/5 min-h-screen z-20 border-0 border-r border-algo-gray-101">
          <div className="h-24 border-b-4 border-gray-50">
            <p>
              <span className="text-xl font-bold text-gray-500">Drinks Safety Level Response</span>
              <FontAwesomeIcon onClick={handleStateReset} className="float-right text-2xl text-pink-500 cursor-pointer" icon={faTimes} />
            </p>
            <p className="text-xs text-gray-500 mt-2">Caffeine Consumed: <span className="text-green-500 font-bold">{selectedDrink.caffeine_per_serving * quantity} mg</span></p>
            <p className="text-xs text-gray-500 mt-1">Caffeine leftOver: <span className="text-green-500 font-bold">  {process.env.REACT_APP_SAFETY_LIMIT - (selectedDrink.caffeine_per_serving * quantity)} mg</span></p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-semibold mt-4">The following are your possible options of drinks, that can you can have to still stay in the safe limit of {process.env.REACT_APP_SAFETY_LIMIT}mg of caffeine.</p>
            <h3 className="text-gray-500 mt-6 font-medium">Drinks Option 1</h3>
            {
              response['option1'] && response['option1']['quantity'] > 0 &&
              <div>
                <p className="text-gray-500 mt-1 font-medium text-xs">
                  You can consume {response['option1']['quantity']} serving(s) of {response['option1']['drink']}
                  <span className="float-right text-pink-500">{response['option1']['caffeine_level'] * response['option1']['quantity']} mg</span>
                </p>
              </div>
            }
            {
              response['option1'] && response['option1'].length === 0 &&
              <p className="text-gray-500 mt-1 font-medium text-xs">No available Option</p>
            }

            <h3 className="text-gray-500 mt-6 font-medium">Drinks Option 2 <span className="text-xs italic">(You can only have one of this)</span></h3>
            <Option options={response['option2']} />

            <h3 className="text-gray-500 mt-6 font-medium">Drinks Option 3 <span className="text-xs italic">(You can have all of this)</span></h3>
            <Option options={response['option3']} />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

export default Response
