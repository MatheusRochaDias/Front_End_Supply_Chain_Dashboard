import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
interface InputProps extends ChakraInputProps {
  name: string;
  label?: string
  error?: any;
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput id={name} name={name} _hover={{ bgColor: "gray.900" }} size="lg" focusBorderColor="#23A0B9" bg="gray.900" variant="filled"
        ref={ref} {...rest} />
      {!!error && (
        <FormErrorMessage mb="5px">{error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}


export const Input = forwardRef(InputBase);