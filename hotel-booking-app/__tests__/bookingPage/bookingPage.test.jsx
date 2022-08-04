import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BookingForm from '../../pages/bookingPage/index.js'

describe('BookingForm tests ', () => {
    test('Success test', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.change(input1,{target:{value:'John'}});
      const input2 = screen.getByTestId('lastName');
      fireEvent.change(input2,{target:{value:'Lee'}});
      const input3 = screen.getByTestId('phoneNumber');
      fireEvent.change(input3,{target:{value:'12345678'}});
      const input4 = screen.getByTestId('email');
      fireEvent.change(input4,{target:{value:'john.lee@someemail.com'}});
      const input5 = screen.getByTestId('specialRequest');
      fireEvent.change(input5,{target:{value:'No request'}});
      const input6 = screen.getByTestId('bankCard')
      fireEvent.change(input6,{target:{value:'374245455400126'}});
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.change(input7,{target:{value:'12/23'}});
      const input8 = screen.getByTestId('CVV');
      fireEvent.change(input8,{target:{value:'123'}});
      const input9 = screen.getByTestId('billingAddress')
      fireEvent.change(input9,{target:{value:'Changi South Avenue 1, Singapore'}});
      const submit = screen.getByRole('button', {name: /Submit/i});
      expect(submit).toBeEnabled();
      fireEvent.click(submit);  


    })
    test('Failure test, credit card', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.blur(input1);
      const input2 = screen.getByTestId('lastName');
      fireEvent.blur(input2);
      const input3 = screen.getByTestId('phoneNumber');
      fireEvent.blur(input3);
      const input4 = screen.getByTestId('email');
      fireEvent.blur(input4);
      const input5 = screen.getByTestId('specialRequest');
      fireEvent.blur(input5);
      const input6 = screen.getByTestId('bankCard')
      fireEvent.change(input6,{target:{value:'1234123412341234'}});
      expect(screen.queryAllByText('Credit Card number is invalid')).not.toBeNull();
    }
    )
    test('Failure test, first name', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.change(input1,{target:{value:'12345'}});
      expect(screen.queryAllByText('Name can only contain Latin letters')).not.toBeNull();
    }
    )
});