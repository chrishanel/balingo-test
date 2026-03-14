import {Box, Typography} from "@mui/material";
import GameGridHeaderScoreboard from "./scoreboard/GameGridHeaderScoreboard";
import type {GameGridSlot} from "../../types/GameGridSlot";
import type {GameConfig} from "../../types/GameConfig";

interface GameGridHeaderProps {
    gridSlots: GameGridSlot[]
    gameConfig?: GameConfig
}

export default function GameGridHeader({gridSlots, gameConfig}: GameGridHeaderProps) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography fontSize={30} lineHeight={1} mt={2} sx={{textShadow: '0 5px 0 #000'}}>
                LAST CLAIM - 00:25
            </Typography>
            <GameGridHeaderScoreboard gridSlots={gridSlots} gameConfig={gameConfig}/>
        </Box>
    )
}
