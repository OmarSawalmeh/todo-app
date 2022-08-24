import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from '../App'

beforeEach(() => {
  render(<App />)
})

test('Load and display app', async () => {
  const header = await waitFor(() => screen.getByTestId('add'))
  expect(header.textContent).toBe('Add To Do Item')
})


