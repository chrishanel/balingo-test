import {Box, Typography} from "@mui/material";
import ScoreboardScore from "./ScoreboardScore";
import type {GameGridSlot} from "../../../types/GameGridSlot";
import {useEffect, useMemo} from "react";
import type {GameConfig} from "../../../types/GameConfig";
import {formatMillisToTime} from "../../../utils";
import {calculateGameAlmostOver, calculateLastGameEndingClaimTime} from "../../../gameAlmostOver";
import {markGameAsDone} from "../../../firebase";

interface GameGridHeaderScoreboardProps {
    gameCode: string;
    gridSlots: GameGridSlot[]
    gameConfig?: GameConfig
    currentTime: number;
    lastClaimTime?: number;
}

interface GameScores {
    redScore: number;
    blueScore: number;
}

export default function GameGridHeaderScoreboard(
    {
        gameCode,
        gridSlots,
        gameConfig,
        currentTime,
        lastClaimTime
    }: GameGridHeaderScoreboardProps
) {
    const {redScore, blueScore} = useMemo<GameScores>(() => {
        return {
            redScore: gridSlots.filter((slot) => slot?.claimedBy === 'red').length,
            blueScore: gridSlots.filter((slot) => slot?.claimedBy === 'blue').length
        }
    }, [gridSlots]);

    const gameTime = useMemo(() => {
        return gameConfig?.gameStartTime ? formatMillisToTime(currentTime - gameConfig?.gameStartTime) : 'N/A'
    }, [gameConfig?.gameStartTime, currentTime]);

    const isGameAlmostOver = useMemo(() => {
        return !gameConfig?.gameEndTime && calculateGameAlmostOver(gridSlots);
    }, [gridSlots, gameConfig?.gameEndTime]);

    const gameTimeRemaining = useMemo(() => {
        const gameEndingClaimTime = calculateLastGameEndingClaimTime(gridSlots, currentTime, lastClaimTime)

        return gameEndingClaimTime && gameEndingClaimTime > 0 ? gameEndingClaimTime - currentTime : undefined;
    }, [gridSlots, lastClaimTime, currentTime]);

    const alertText = useMemo(() => {
        if (isGameAlmostOver) {
            return "HURRY!"
        } else if (gameConfig?.gameEndTime) {
            return "GAME OVER!";
        } else {
            return "";
        }
    }, [isGameAlmostOver, gameConfig?.gameEndTime]);

    useEffect(() => {
        const isPastFiveMinutes = lastClaimTime && currentTime - lastClaimTime > (5 * 60 * 1000);
        if (isGameAlmostOver && !gameConfig?.gameEndTime && isPastFiveMinutes) {
            //TODO: update.
            console.log("Game's done??", lastClaimTime, currentTime, formatMillisToTime(currentTime - lastClaimTime));
            markGameAsDone(gameCode, currentTime);
        }
    }, [isGameAlmostOver, gameConfig?.gameEndTime, currentTime, lastClaimTime]);

    return (
        <Box display="flex" flexDirection="row" justifyContent="center" width="90%" height={{xs: 90, md: 110}}
             bgcolor="#2E3A3C" border="3px solid #F2C255" borderRadius={6} mb={-3} px={2} zIndex={-1}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between"
                 position="relative" width="100%">
                <ScoreboardScore score={redScore} playerName={gameConfig?.red?.name ?? "---"}
                                 backgroundColor="#FF4C40"/>
                <Box width={{xs: 80, md: 120}}>
                    <Typography fontSize={{xs: 24, md: 40}} lineHeight={1} mt={isGameAlmostOver ? 1 : -1}
                                sx={{textShadow: '0 3px 0 #000'}}>{alertText}</Typography>
                </Box>
                <Typography component="span" fontSize={{xs: 36, md: 64}} lineHeight={1}
                            sx={{textShadow: '0 3px 0 #000'}}>{gameTime}</Typography>
                <Box bgcolor={isGameAlmostOver ? "#F2C255" : ""} borderRadius={3} lineHeight={1} pt={1}
                     width={{xs: 80, md: 120}}>
                    {isGameAlmostOver && gameTimeRemaining && (
                        <Typography fontSize={{xs: 24, md: 40}} lineHeight={1}
                                    sx={{textShadow: '0 3px 0 #000'}}>{formatMillisToTime(gameTimeRemaining)}</Typography>
                    )}
                </Box>
                <ScoreboardScore score={blueScore} playerName={gameConfig?.blue?.name ?? "---"}
                                 backgroundColor="#0093FF"/>
            </Box>
        </Box>
    )
}
