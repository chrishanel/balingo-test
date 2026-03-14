import {Stack, styled, Switch, Typography} from "@mui/material";
import type {ChangeEvent} from "react";

const RedBlueStyledSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase': {
        '& .MuiSwitch-thumb': {
            backgroundColor: '#FF4C40'
        },
        '& + .MuiSwitch-track': {
            backgroundColor: '#FF4C40',
        },
        '&.Mui-checked': {
            '& .MuiSwitch-thumb': {
                backgroundColor: '#0093FF',
            },
            '& + .MuiSwitch-track': {
                backgroundColor: '#0093FF',
            },
        }
    }
}))

interface RedBlueSwitchProps {
    isBlue: boolean
    onPlayerColorChange: (isBlue: boolean) => void
}

export default function RedBlueSwitch({isBlue, onPlayerColorChange}: RedBlueSwitchProps) {
    const handlePlayerColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        onPlayerColorChange(event.target.checked)
    }
    return (
        <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
            <Typography fontSize={28} color={!isBlue ? "#FF4C40" : "#FFF"}>Red</Typography>
            <RedBlueStyledSwitch checked={isBlue} onChange={handlePlayerColorChange}/>
            <Typography fontSize={28} color={isBlue ? "#0093FF" : "#FFF"}>Blue</Typography>
        </Stack>
    )
}
