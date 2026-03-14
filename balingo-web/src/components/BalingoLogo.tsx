import {Stack, Typography} from "@mui/material";

export default function BalingoLogo() {
    return (
        <Stack direction="column" maxWidth='95%'>
            <Typography component="span" fontSize={{xs: 120, sm: 138}}
                        lineHeight="normal">BALINGO</Typography>
            <Typography component="span" fontSize={{xs: 24, sm: 30}} mt={-2} lineHeight="normal">
                A NEW BINGO PROTOTYPE FOR BALATRO
            </Typography>
        </Stack>
    )
}
