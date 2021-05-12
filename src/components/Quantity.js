import React from 'react'
import styles from '../styles/style.module.css'
import {useSelector, useDispatch} from "react-redux";
import {increaseDrinkQuantity, decreaseDrinkQuantity, setStateProperty} from "../redux/drinks_actions";

const Quantity = ({currentCaffeineLevel}) => {
  let { quantity, selectedDrink } = useSelector(({drinks}) => drinks)
  const dispatch = useDispatch();

  const decrement = () => {
    if (quantity > 1) {
      dispatch(decreaseDrinkQuantity())
    }
  }
  const increment = () => {
    if (Object.keys(selectedDrink).length === 0) {
      dispatch(setStateProperty({property: 'error', payload: 'Please select a drink.'}))
      return false
    }

    if (currentCaffeineLevel < parseInt(process.env.REACT_APP_SAFETY_LIMIT)) {
      dispatch(increaseDrinkQuantity())
    }

    dispatch(setStateProperty({property: 'error', payload: 'You have gone past the safety limit for the selected drink'}))
  }

  return (
    <div className={styles.quantity}>
      <a onClick={decrement} className={`cursor-pointer ${styles.quantity__minus}`}><span>-</span></a>
      <input readOnly value={quantity} name="quantity" type="text" className={`cursor-pointer ${styles.quantity__input}`} />
      <a onClick={increment} className={`cursor-pointer ${styles.quantity__plus}`}><span>+</span></a>
    </div>
  )
}

export default Quantity;
