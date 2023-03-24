import { ChangeEvent, ReactNode } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/react";

interface SelectProps extends ChakraSelectProps {
  label?: ReactNode;
  error?: { message: string };
  name: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  label,
  error,
  name,
  options,
  onChange,
  ...rest
}: SelectProps) {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSelect
        id={name}
        name={name}
        _hover={{ bgColor: "gray.900" }}
        size="lg"
        focusBorderColor="#23A0B9"
        bg="gray.900"
        onChange={onChange}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      {!!error && <FormErrorMessage mb="5px">{error.message}</FormErrorMessage>}
    </FormControl>
  );
}