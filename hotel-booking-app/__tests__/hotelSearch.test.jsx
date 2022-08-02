import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import SearchForm from '../modules/hotelSearch/components/searchForm';
import userEvent from'@testing-library/user-event';
import {jest} from '@jest/globals';


describe('Search Form', () => {
    test('should accept all valid Inputs', async () => {
        const handleSubmit = jest.fn();

        render(<SearchForm onSubmit={handleSubmit} />);

        const checkIn = screen.getByTestId('checkIn');
        const checkOut = screen.getByTestId('checkOut');
        const rooms = screen.getByTestId('rooms');
        const adults = screen.getByTestId('adults');
        const children = screen.getByTestId('children');
        const submit = screen.getByTestId('submitButton');

        expect(checkIn).toBeInTheDocument();
        expect(checkOut).toBeInTheDocument();
        expect(rooms).toBeInTheDocument();
        expect(adults).toBeInTheDocument();
        expect(children).toBeInTheDocument();
        expect(submit).toBeInTheDocument();

        // await userEvent.type(checkIn, "2022-12-02");
        // await userEvent.type(checkIn, "2022-12-09");
        // await userEvent.type(rooms, "1");
        // await userEvent.type(adults, "2");
        // await userEvent.type(children, "0");
        // await userEvent.click(submit);
        // handleSubmit();

        // await waitFor(() => {
        //     expect(handleSubmit).toHaveBeenCalledTimes(1)
        // })


    })
});