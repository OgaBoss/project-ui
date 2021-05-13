import React from 'react'

const Option = ({options, conjunction}) => {
  if (options && Object.keys(options).length > 0) {
    return (
      <div>
        {
          Object.keys(options).map((item, index) => {
            return <p key={index} className="text-gray-500 mt-1 font-medium text-xs">
              You can consume {options[item]['quantity']} serving(s) of {options[item]['drink']}
              {item < Object.keys(options).length ? `, ${conjunction}` : '.'}
              <span className="float-right text-pink-500">
                {options[item]['caffeine_level'] * options[item]['quantity']} mg
              </span>
            </p>
          })
        }
      </div>
    )
  } else {
    return (
      <p className="text-gray-500 mt-1 font-medium text-xs">No available Option</p>
    )
  }
}

export default Option
