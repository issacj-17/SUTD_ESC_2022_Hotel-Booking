import React from "react";
import {AsyncSelect} from "chakra-react-select";
import destinations from './destinations.json';

// const renderResults = (input, callback) => {
//     setTimeout(() => {
//         if (input.length >= 3) {
//             const values = destinations.filter((json) =>
//                 json.term.toLowerCase().includes(input.toLowerCase()));
//             callback(values);
//         }
//         // else {
//         //     callback()
//         // }
//     }, 300);
// }

const renderResults = (q, callback) => {
    setTimeout(async () => {
        if (q.length >= 3) {
            const params = new URLSearchParams({q});

            const res = await fetch('/api/search?' + params);
            const result = await res.json();

            const data = result['destinations']
            callback(data);
        }
        else {
            callback()
        }
    }, 1500);
}

export default function DestinationSearch({field, form, ...props}) {

    return (<AsyncSelect
        name={field.name}
        size="md"
        getOptionLabel={(option)=>option.term}
        getOptionValue={(option)=>option.uid}
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
                renderResults(inputValue, callback);
            }
        }
        onChange={(option) =>
            form.setFieldValue(field.name, option.uid)
        }
        onBlur={field.onBlur}
        {...props}/>
    );

}