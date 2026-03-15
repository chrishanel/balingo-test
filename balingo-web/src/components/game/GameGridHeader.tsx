import {Box, Typography} from "@mui/material";
import GameGridHeaderScoreboard from "./scoreboard/GameGridHeaderScoreboard";
import type {GameGridSlot} from "../../types/GameGridSlot";
import type {GameConfig} from "../../types/GameConfig";
import {useEffect, useMemo, useState} from "react";
import {formatMillisToTime} from "../../utils";

interface GameGridHeaderProps {
    gameCode: string
    gridSlots: GameGridSlot[]
    gameConfig?: GameConfig
}

export default function GameGridHeader({gameCode, gridSlots, gameConfig}: GameGridHeaderProps) {
    const [currentTime, setCurrentTime] = useState(gameConfig?.gameEndTime ?? new Date().getTime());
    const lastClaimTime = useMemo(() => {
        const latestClaim = [...gridSlots].sort((a, b) => (b.claimTime ?? 0) - (a.claimTime ?? 0))[0];
        return latestClaim.claimTime ? latestClaim.claimTime : undefined;
    }, [gridSlots]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(gameConfig?.gameEndTime ?? new Date().getTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [gameConfig?.gameEndTime]);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={30} lineHeight={1} mt={2} sx={{textShadow: '0 5px 0 #000'}}>
                LAST CLAIM - {lastClaimTime ? formatMillisToTime(currentTime - lastClaimTime) : 'N/A'}
            </Typography>
            <GameGridHeaderScoreboard gameCode={gameCode} gridSlots={gridSlots} gameConfig={gameConfig}
                                      currentTime={currentTime} lastClaimTime={lastClaimTime}/>
        </Box>
    )
}
