import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import SearchForm from '../modules/hotelSearch/components/searchForm';
import userEvent from'@testing-library/user-event';
import {jest} from '@jest/globals';
import { act } from 'react-dom/test-utils';


describe('Search Form', () => {
    test('should accept all valid Inputs', async () => {
        const handleSubmit = jest.fn();

        render(<SearchForm onSubmit={handleSubmit} />);

        // const destination = screen.getByTestId('destination');
        const checkIn = screen.getByTestId('checkIn');
        const checkOut = screen.getByTestId('checkOut');
        const rooms = screen.getByTestId('rooms');
        const adults = screen.getByTestId('adults');
        const children = screen.getByTestId('children');
        const submit = screen.getByTestId('submitButton');

        // expect(destination).toBeInTheDocument();
        expect(checkIn).toBeInTheDocument();
        expect(checkOut).toBeInTheDocument();
        expect(rooms).toBeInTheDocument();
        expect(adults).toBeInTheDocument();
        expect(children).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        // fireEvent.click(checkIn)
        // fireEvent.change(checkIn, {target:{value:"2022-08-05"}});
        // fireEvent.change(checkOut, {target:{value:"09/8/2022"}});
        act(()=>{
            fireEvent.focus(checkIn);
            fireEvent.change(checkIn, {target:{value:"2022-08-05"}});
            fireEvent.focus(rooms);
            fireEvent.change(rooms, {target:{value:"1"}});
        });
        // fireEvent.change(adults, {target:{value:"2"}})
        expect(rooms.value).toBe("1");
        expect(checkIn.value).toBe("2022-08-05");
        
        // console.log(checkIn.innerHTML)
        // expect(screen.getByText(/must be at least 3 days in advance/i)).toBeInTheDocument();
        // await userEvent.type(checkIn, "2022-12-09");
        // await userEvent.type(rooms, "1");
        // await userEvent.type(adults, "2");
        // await userEvent.type(children, "0");
        // await userEvent.click(submit);
        // handleSubmit();
        // fireEvent.click(submit)
        // fireEvent.click(submit)
        // expect(await screen.findByText(/date is required/i)).toBeInTheDocument()
        


        // await waitFor(() => {
        //     expect(handleSubmit).toHaveBeenCalledTimes(1)
        // })


    })
});