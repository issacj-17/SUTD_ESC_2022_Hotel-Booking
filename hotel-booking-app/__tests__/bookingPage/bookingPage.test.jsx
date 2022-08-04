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
    test('Failure test, last name', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.blur(input1);
      const input2 = screen.getByTestId('lastName');
      fireEvent.change(input2,{target:{value:'12345'}});
      expect(screen.queryAllByText('Name can only contain Latin letters')).not.toBeNull();
    }
    )
    test('Failure test, phone number, key in letters instead of numbers', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.blur(input1);
      const input2 = screen.getByTestId('lastName');
      fireEvent.blur(input2);
      const input3 = screen.getByTestId('phoneNumber');
      fireEvent.change(input3,{target:{value:'hievxtsw'}});
      expect(screen.queryAllByText('Phone number is not valid')).not.toBeNull();
    }
    )
    test('Failure test, phone number, length too short', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.blur(input1);
      const input2 = screen.getByTestId('lastName');
      fireEvent.blur(input2);
      const input3 = screen.getByTestId('phoneNumber');
      fireEvent.change(input3,{target:{value:'123'}});
      expect(screen.queryAllByText('Your phone number is not valid')).not.toBeNull();
    }
    )
    test('Failure test, email', async() => {
      const handleSubmit = jest.fn();
      render(<BookingForm onSubmit = {handleSubmit}/>)
      const input1 = screen.getByTestId('firstName');
      fireEvent.blur(input1);
      const input2 = screen.getByTestId('lastName');
      fireEvent.blur(input2);
      const input3 = screen.getByTestId('phoneNumber');
      fireEvent.blur(input3);
      const input4 = screen.getByTestId('email');
      fireEvent.change(input4,{target:{value:'12345'}});
      expect(screen.queryAllByText('Invalid email address')).not.toBeNull();
    }
    )
    test('Failure test, credit card, type error', async() => {
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
      fireEvent.change(input6,{target:{value:'abc'}});
      expect(screen.queryAllByText('Your bank card is not valid')).not.toBeNull();
    }
    )
    test('Failure test, credit card, false number', async() => {
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
    test('Failure test, expiry date, type error', async() => {
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
      fireEvent.blur(input6);
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.change(input7,{target:{value:'abcde'}});
      expect(screen.queryAllByText('Not a valid expiration date. Example: MM/YY')).not.toBeNull();
    }
    )
    test('Failure test, expiry date, exceeds max length', async() => {
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
      fireEvent.blur(input6);
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.change(input7,{target:{value:'12/234'}});
      expect(screen.queryAllByText('Not a valid expiration date. Example: MM/YY')).not.toBeNull();
    }
    )
    test('Failure test, expiry date, invalid date and year', async() => {
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
      fireEvent.blur(input6);
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.change(input7,{target:{value:'00/00'}});
      expect(screen.queryAllByText('Not a valid expiration date. Example: MM/YY')).not.toBeNull();
    }
    )
    test('Failure test, expiry date, keyed in date in the past', async() => {
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
      fireEvent.blur(input6);
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.change(input7,{target:{value:'12/10'}});
      expect(screen.queryAllByText('Invalid Expiration Date has past')).not.toBeNull();
    }
    )
    test('Failure test, expiry date, invalid month', async() => {
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
      fireEvent.blur(input6);
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.change(input7,{target:{value:'13/22'}});
      expect(screen.queryAllByText('Invalid Expiration Month')).not.toBeNull();
    }
    )
    test('Failure test, CVV', async() => {
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
      fireEvent.blur(input6);
      const input7 = screen.getByTestId('expiryDate');
      fireEvent.blur(input7);
      const input8 = screen.getByTestId('CVV');
      fireEvent.change(input8,{target:{value:'123456'}});
      expect(screen.queryAllByText('Must be exactly 3/4 characters')).not.toBeNull;
    }
    )
});