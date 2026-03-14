import {Box, Button, Typography} from "@mui/material";
import type {GameStake} from "../../types/GameStake";

interface GameGridStakeCardProps {
    stake: GameStake;
    isSelected: boolean;
    onClick: (stake: GameStake) => void;
}

export default function GameGridStakeCard({stake, isSelected, onClick}: GameGridStakeCardProps) {
    const {stakeColor, backgroundColor, borderColor} = stake;

    return (
        <Button variant="outlined"
                onClick={() => onClick(stake)}
                sx={{
                    padding: 0,
                    backgroundColor: backgroundColor,
                    borderColor: isSelected ? borderColor : backgroundColor,
                    borderRadius: 1,
                    borderWidth: 2,
                    opacity: isSelected ? '100%' : '60%',
                    width: "100%",
                    aspectRatio: 1.5
                }}>
            {isSelected ? (
                <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center"
                     height="100%" pt={0.25}>
                    <img src={`/images/chips/${stakeColor}-chip.png`} width={25} height={25}
                         alt={`${stakeColor} chip image`}/>
                    <Typography color="white" fontSize={24} mt={-1.5} lineHeight={1}
                                sx={{textShadow: '1.354px 1.354px 0 #000'}}>{stakeColor}</Typography>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <img src={`/images/chips/${stakeColor}-chip.png`} alt={`${stakeColor} chip image`}/>
                </Box>
            )}
        </Button>
    )
}
