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

        act(()=>{
            fireEvent.focus(checkIn);
            fireEvent.change(checkIn, {target:{value:"2022-09-05"}});
            fireEvent.focus(checkOut);
            fireEvent.change(checkOut, {target:{value:"2022-09-10"}});
            fireEvent.focus(rooms);
            fireEvent.change(rooms, {target:{value:"1"}});
            fireEvent.focus(adults);
            fireEvent.change(adults, {target:{value:"2"}});
            fireEvent.focus(children);
            fireEvent.change(children, {target:{value:"0"}});
        });
        
        expect(checkIn.value).toBe("2022-09-05");
        expect(checkOut.value).toBe("2022-09-10");
        expect(rooms.value).toBe("1");
        expect(adults.value).toBe("2");
        expect(children.value).toBe("0");
        
    })
});