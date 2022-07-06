import React from 'react';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {
    Flex, Box,
    VStack, HStack,
    FormControl, FormLabel, Input,
    Button, FormErrorMessage, Select,
} from "@chakra-ui/react";
import DestinationSearch from "./destinationSearch";

import { useRouter } from "next/router";
import { checkTargetForNewValues } from 'framer-motion';

// configure props
function sendProps(router, values){
    console.log(values);
    router.push({
    pathname:"/searchResults",
    query: {destination:values.destination,
        checkInDate: values.checkInDate,
        checkOutDate: values.checkOutDate,
        rooms: values.rooms,
        adults: values.adults,
        children: values.children
            }
    })
    console.log("Props sent!");
}

export default function SearchForm() {
    let numOfDays = 3
    let minCheckInDate = new Date(Date.now() + numOfDays*86400000);
    let minCheckOutDate = new Date(Date.now() + (numOfDays+1)*86400000);

    // Router initialization
    let router = useRouter();

    const SearchSchema = Yup.object().shape({
        destination: Yup.string().required("Destination is required"),
        checkInDate: Yup.date().min(minCheckInDate.toDateString(), `Must be at least ${numOfDays} days in advance`).required("Date is required"),
        checkOutDate: Yup.date().min(minCheckOutDate.toDateString(), `Must be at least ${numOfDays + 1} days in advance`).required("Date is required").test('OK', "Must be after Check In",
            (val, props) => {
                const endDate = new Date(val)
                const startDate = new Date(new Date(props.parent.checkInDate) + 86400000);

                if (endDate > startDate || !props.parent.checkInDate) {
                    return true;
                }
            }
        ),
        rooms: Yup.number().integer().min(1, "At least 1 Room is Required").max(4).required("Room is required"),
        adults: Yup.number().integer().min(1, "At least 1 Adult is Required").max(4).required("Adult is required"),
        children: Yup.number().integer().min(0, "Value must be greater than 0").max(4),
    });

    return (
        <Flex
            w="100%"
            bg="lightslategrey"
            align="center"
            justify="end"
            rounded="md"
            p={8}
            minWidth="fit-content"
            width="full">
            <Box
                bg="white"
                p={8}
                rounded="md"
                minWidth="fit-content"
                width="30%"
                height="fit-content"
                >
                <Formik
                    initialValues={{
                        destination: "",
                        checkInDate: "",
                        checkOutDate: "",
                        rooms: 1,
                        adults: 2,
                        children: 0
                    }}
                    validationSchema={SearchSchema}
                    onSubmit={(values) => {
                        // alert(JSON.stringify(values, null, 2));

                        // routing 
                        sendProps(router, values);


                    }}>

                    {({ handleSubmit, errors, touched }) => (
                        <form
                            onSubmit={handleSubmit}>
                            <VStack
                                spacing={4}
                                align="flex-start"
                                width="100%">
                                <FormControl
                                    isInvalid={!!errors.destination && touched.destination}
                                    isRequired>
                                    <FormLabel
                                        htmlFor="destination">
                                        Destination
                                    </FormLabel>
                                    <Field
                                        component={DestinationSearch}
                                        id="destination"
                                        name="destination"
                                        type="text"
                                        placeholder="Enter Your Destination"/>
                                    <FormErrorMessage>
                                        {errors.destination}
                                    </FormErrorMessage>
                                </FormControl>

                                <HStack
                                    spacing={4}
                                    align="flex-start"
                                    width="100%">
                                    <FormControl
                                        isInvalid={!!errors.checkInDate && touched.checkInDate}
                                        isRequired>
                                        <FormLabel
                                            htmlFor="checkInDate">
                                            Check In
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="checkInDate"
                                            name="checkInDate"
                                            type="date"
                                            variant="filled"/>
                                        <FormErrorMessage>
                                            {errors.checkInDate}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        isInvalid={!!errors.checkOutDate && touched.checkOutDate}
                                        isRequired>
                                        <FormLabel
                                            htmlFor="checkOutDate">
                                            Check Out
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="checkOutDate"
                                            name="checkOutDate"
                                            type="date"
                                            variant="filled"/>
                                        <FormErrorMessage>
                                            {errors.checkOutDate}
                                        </FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <HStack
                                    spacing={4}
                                    align="flex-start"
                                    width="100%">
                                    <FormControl
                                        isInvalid={!!errors.rooms && touched.rooms}
                                        isRequired>
                                        <FormLabel
                                            htmlFor="rooms">
                                            Rooms
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="rooms"
                                            name="rooms"
                                            type="number"
                                            variant="filled">
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            </Field>
                                        <FormErrorMessage>
                                            {errors.rooms}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        isInvalid={!!errors.adults && touched.adults}
                                        isRequired>
                                        <FormLabel
                                            htmlFor="adults">
                                            Adults
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="adults"
                                            name="adults"
                                            type="number"
                                            variant="filled">
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </Field>
                                        <FormErrorMessage>
                                            {errors.adults}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        isInvalid={!!errors.children && touched.children}>
                                        <FormLabel
                                            htmlFor="children">
                                            Children
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="children"
                                            name="children"
                                            type="number"
                                            variant="filled">
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                        </Field>
                                        <FormErrorMessage>
                                            {errors.children}
                                        </FormErrorMessage>
                                    </FormControl>
                                </HStack>

                                <Button
                                    type="submit"
                                    colorScheme="purple"
                                    width="100%">
                                    Search
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    )

}