import React from "react";
import {AsyncSelect} from "chakra-react-select";
import destinations from './destinations.json';

/**
 *   Fetches Destination Search Results from RedisSearch API
 *   @param {string} q - Input from Destination Search Text Field
 *   @param {function} callback - Function to Load Results from JSON Response into Dropdown Options
 */
const getResults = (q, callback) => {
    setTimeout(async () => {
        if (q.length >= 3) {
            const params = new URLSearchParams({q});

            const res = await fetch('/api/hotelSearch/search?' + params);
            const result = await res.json();

            const data = result['destinations']
            callback(data);
        }
        else {
            callback()
        }
    }, 1500);
}

/**
 *
 * @param {Formik<FieldAttributes>} field - Field Attributes
 * @param {form} form - Form Attributes
 * @param {props} props - Formik Props
 * @returns {JSX.Element} - Destination Search AutoComplete
 * @constructor
 */

export default function DestinationSearch({field, form, ...props}) {

    return (<AsyncSelect
        name={field.name}
        id="destination-select"
        size="md"
        getOptionLabel={(option)=>option.term}
        getOptionValue={(option)=>option.uid}
        instanceId="destination-select"
        chakraStyles={{
            control: base => ({
                ...base,
                "&:hover": {
                    bg:"gray.100"
                }
            }),
            dropdownIndicator: (provided) => ({
                ...provided,
                bg: "gray.100",
                px: 2,
                cursor: "inherit"
            }),
            indicatorSeparator: (provided) => ({
                ...provided,
                display: "none"
            }),
            inputContainer: (provided) => ({
                ...provided,
                background: "gray.100",
                color:'black',
            }),
            placeholder: (provided) => ({
               ...provided,
               color:'black',
            }),
            loadingIndicator: (provided) => ({
                ...provided,
                emptyColor:"gray"
            }),
            valueContainer: (provided) => ({
                ...provided,
                background: "gray.100",
                color:'black',
            })
        }}
        loadOptions={(inputValue, callback) => {
                getResults(inputValue, callback);
            }
        }
        onChange={(option) =>
            form.setFieldValue(field.name, option.uid)
        }
        onBlur={field.onBlur}
        {...props}/>
    );

}