import { fireEvent, render, screen } from '@testing-library/react'
// import searchResults from '../pages/searchResults'
import '@testing-library/jest-dom'
import getGuestReqString from '../pages/searchResults'

describe('searchResults', () => {
//   it('renders a heading', () => {
//     render(<searchResults />)

//     const heading = screen.getByTestId('header')

//     expect(heading).toBeInTheDocument()
//   })

  test('gets no of guests', () => {
    expect(getGuestReqString(2,4)).toBe("4|4")
  })
})

