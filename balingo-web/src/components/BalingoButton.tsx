import {Button, Typography} from "@mui/material";
import {useMemo} from "react";

interface BalingoButtonProps {
    text: string;
    buttonColor: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
}

export default function BalingoButton({text, buttonColor, size, onClick}: BalingoButtonProps) {

    const buttonSize = useMemo(() => {
        switch (size) {
            case 'small':
                return 60;
            case 'medium':
                return 180;
            case 'large':
                return 420;
        }
    }, [size]);

    const buttonStyle = useMemo(() => ({
        bgcolor: buttonColor,
        width: buttonSize,
        maxWidth: '95%',
        borderRadius: 4,
        boxShadow: '0 4px 0 0 rgba(0, 0, 0, 0.25)',

    }), [buttonColor, buttonSize])

    return (
        <Button sx={buttonStyle} color={'white'} onClick={onClick}>
            <Typography fontSize={36} sx={{textShadow: '0 3px 0 #000'}}>{text}</Typography>
        </Button>
    )
}
