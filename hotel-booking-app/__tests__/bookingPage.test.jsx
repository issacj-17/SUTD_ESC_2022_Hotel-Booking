import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BookingForm from '../pages/bookingPage/index.js'

describe('BookingForm tests ', () => {
    test('Success test', async() => {
        const handleSubmit = jest.fn()
        render(<BookingForm onSubmit={handleSubmit}/>)
        const user = userEvent.setup()
        await user.type(screen.getByLabelText(/first name/i), 'John')
        await user.type(screen.getByLabelText(/last name/i), 'Lee')
        await user.type(screen.getByLabelText(/phone number/i), '12345678')
        await user.type(screen.getByLabelText(/email/i), 'john.lee@someemail.com')
        await user.type(screen.getByLabelText(/phone number/i), '12345678')
        await user.type(screen.getByLabelText(/special request/i), 'No request')
        await user.type(screen.getByLabelText(/bank card number/i), '374245455400126')
        await user.type(screen.getByLabelText(/expiry date/i), '12/23')
        await user.type(screen.getByTestId('CVV'), '123')
        await user.type(screen.getByLabelText(/billing address/i), 'Changi South Avenue 1, Singapore')
        
        await user.click(screen.getByRole('button', {name: /submit/i}))

        await waitFor(() =>
          expect(handleSubmit).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Lee',
            phoneNumber: '12345678',
            email: 'john.lee@someemail.com',
            specialRequest: 'No request',
            bankCard: '374245455400126',
            expiryDate: '12/23',
            CVV: '123',
            billingAddress: 'Changi South Avenue 1, Singapore'

    }),
  )
});
})