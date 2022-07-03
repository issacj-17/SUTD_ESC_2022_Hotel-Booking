import React, {useState} from 'react';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import {
    Flex, Box,
    VStack, HStack,
    FormControl, FormLabel, Input,
    Button, FormErrorMessage, Select,
} from "@chakra-ui/react";

export default function SearchForm() {
    let numOfDays = 3
    let minCheckInDate = new Date(Date.now() + numOfDays*86400000);
    minCheckInDate.setHours(0, 0, 0, 0)
    let minCheckOutDate = new Date(Date.now() + (numOfDays+1)*86400000);
    minCheckOutDate.setHours(0, 0, 0, 0)

    const SearchSchema = Yup.object().shape({
        destination: Yup.string().required("Destination is required"),
        checkInDate: Yup.date().min(minCheckInDate.toDateString(), `Booking has to be made ${numOfDays} in advance`).required("Date is required"),
        checkOutDate: Yup.date().min(minCheckOutDate.toDateString(), "Check Out has to be after Check In").required("Date is required"),
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
            h="full">
            <Box
                bg="white"
                p={8}
                rounded="md"
                h="fit-content"
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
                        alert(JSON.stringify(values, null, 2));
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
                                        as={Input}
                                        id="destination"
                                        name="destination"
                                        type="text"
                                        variant="filled"
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