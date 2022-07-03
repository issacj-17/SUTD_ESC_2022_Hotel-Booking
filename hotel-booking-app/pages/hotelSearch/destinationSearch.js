import React from "react";
import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text} from "@chakra-ui/react"
import {AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList} from "@choc-ui/chakra-autocomplete";
import destinations from './destinations.json';
import {Field} from "formik";


export default function DestinationSearch(errors, touched) {
    // console.log(destinations);

    return (
        <FormControl
            isInvalid={!!errors.destination && touched.destination}
            isRequired>
            <FormLabel
                htmlFor="destination">
                Destination
            </FormLabel>
            <AutoComplete>
                <Field
                    as={AutoCompleteInput}
                    id="destination"
                    name="destination"
                    type="text"
                    variant="filled"
                    placeholder="Enter Your Destination"
                    autoFocus/>
                <AutoCompleteList>
                    {destinations.map((country, uid) => (
                        <AutoCompleteItem
                            key={`option-${uid}`}
                            value={country["term"]}
                            textTransform="capitalize">
                            <Text
                                ml="5">
                                {country["term"]}
                            </Text>
                        </AutoCompleteItem>
                    ))}
                    </AutoCompleteList>
            </AutoComplete>
            <FormErrorMessage>
                {errors.destination}
            </FormErrorMessage>
            <FormHelperText>
                Enter Your Destination
            </FormHelperText>
        </FormControl>
    );
}