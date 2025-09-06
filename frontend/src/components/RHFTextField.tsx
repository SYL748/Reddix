import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
} & Omit<TextFieldProps, "name" | "value" | "onChange" | "onBlur" | "ref">;

export function RHFTextField<T extends FieldValues>({
    name,
    control,
    ...props
}: Props<T>) {
    return (
        <Controller<T>
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    {...props}
                    error={!!error}
                    helperText={error?.message}
                />
            )}
        />
    )
}
