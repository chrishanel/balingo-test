import {Box, Typography} from "@mui/material";
import ScoreboardScore from "./ScoreboardScore";
import type {GameGridSlot} from "../../../types/GameGridSlot";
import {useMemo} from "react";
import type {GameConfig} from "../../../types/GameConfig";

interface GameGridHeaderScoreboardProps {
    gridSlots: GameGridSlot[]
    gameConfig?: GameConfig
}

interface GameScores {
    redScore: number;
    blueScore: number;
}

export default function GameGridHeaderScoreboard({gridSlots, gameConfig}: GameGridHeaderScoreboardProps) {
    const {redScore, blueScore} = useMemo<GameScores>(() => {
        return {
            redScore: gridSlots.filter((slot) => slot?.claimedBy === 'red').length,
            blueScore: gridSlots.filter((slot) => slot?.claimedBy === 'blue').length
        }
    }, [gridSlots]);
    return (
        <Box display="flex" flexDirection="row" justifyContent="center" width="90%" height={{xs: 90, md: 110}}
             bgcolor="#2E3A3C" border="3px solid #F2C255" borderRadius={6} mb={-3} px={2} zIndex={-1}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
                 position="relative" width="100%">
                <ScoreboardScore score={redScore} playerName={gameConfig?.red?.name ?? "---"}
                                 backgroundColor="#FF4C40"/>
                <Box width={{xs: 80, md: 120}}>
                    <Typography fontSize={{xs: 24, md: 40}} lineHeight={1} pt={1}
                                sx={{textShadow: '0 3px 0 #000'}}>HURRY!</Typography>
                </Box>
                <Typography component="span" fontSize={{xs: 40, md: 69}} lineHeight={1}
                            sx={{textShadow: '0 3px 0 #000'}}>14:47</Typography>
                <Box bgcolor="#F2C255" borderRadius={3} lineHeight={1} pt={1} width={{xs: 80, md: 120}}>
                    <Typography fontSize={{xs: 24, md: 40}} lineHeight={1}
                                sx={{textShadow: '0 3px 0 #000'}}>4:35</Typography>
                </Box>
                <ScoreboardScore score={blueScore} playerName={gameConfig?.blue?.name ?? "---"}
                                 backgroundColor="#0093FF"/>
            </Box>
        </Box>
    )
}
