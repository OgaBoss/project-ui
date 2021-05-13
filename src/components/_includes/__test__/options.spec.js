import React from "react";
import { render } from '@testing-library/react'
import Options from "../Options";

const options = [
  {
    quantity: 2,
    caffeine_level: 88,
    drink: 'Drink1'
  }
]

describe('Options', () => {
  test('display drinks options', async () => {
    const {getByText} = render(<Options options={options} />)
    expect(getByText('176 mg')).toBeInTheDocument()
  })
})

