import {TextField, type TextFieldProps} from "@mui/material";
import type {ReactNode} from "react";

type BalingoLargeTextFieldProps = {
    endAdornment?: ReactNode;
} & TextFieldProps

export default function BalingoLargeTextField(props: BalingoLargeTextFieldProps) {
    return (
        <TextField
            sx={{width: 420, maxWidth: '95%', fontSize: 40}} label="Game code" size="medium" {...props}
            slotProps={{
                input: {
                    endAdornment: props.endAdornment,
                    sx: {
                        fontSize: 32
                    }
                },
                inputLabel: {
                    sx: {
                        fontSize: 32
                    }
                }
            }}/>
    )
}
