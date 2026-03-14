import {Box, Typography} from "@mui/material";

interface ScoreboardScoreProps {
    score: number;
    playerName: string;
    backgroundColor: string;
}

export default function ScoreboardScore({score, playerName, backgroundColor}: ScoreboardScoreProps) {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center">
            <Box borderRadius={3} bgcolor={backgroundColor} px={3} height="fit-content">
                <Typography fontSize={{xs: 24, md: 36}} lineHeight={1} py={0.5}
                            style={{textShadow: "0 5px 0 #000"}}>{score}</Typography>
            </Box>
            <Typography>{playerName}</Typography>
        </Box>
    )
}
