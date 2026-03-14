import {Box, Grid, Typography} from "@mui/material";
import type {GameStake} from "../../types/GameStake";
import GameGridStakeCard from "./GameGridStakeCard";

interface GameGridStakesProps {
    gameId: string;
    stakes: GameStake[];
    selectedStake: GameStake;
    onCardClick: (stake: GameStake) => void;
}

export default function GameGridStakes({gameId, stakes, selectedStake, onCardClick}: GameGridStakesProps) {
    return (
        <Box display="flex" flexDirection="column">
            <Grid container columns={{xs: 4, sm: 8}} mt={2} spacing={1}>
                {stakes.map((stake) => (
                    <Grid key={stake.stakeColor} size={1}>
                        <GameGridStakeCard stake={stake} isSelected={stake === selectedStake} onClick={onCardClick}/>
                    </Grid>
                ))}
            </Grid>
            <Typography mt={1} fontSize={18} sx={{textShadow: '0 5px 0 #000'}}>SELECT CURRENT STAKE</Typography>
            <Typography mt={0.5} fontSize={14} lineHeight={1} sx={{textShadow: '0 5px 0 #000'}}>
                GAME ID: {gameId}
            </Typography>
        </Box>
    )
}
