import {Box, Stack} from "@mui/material";
import type {GameGridSlot} from "../../types/GameGridSlot";
import GameGridSlotView from "./GameGridSlotView";
import {chunked} from "../../utils";
import GameGridStakes from "./GameGridStakes";
import type {GameStake} from "../../types/GameStake";
import {useState} from "react";

interface GameGridProps {
    gameId: string;
    gridSlots: GameGridSlot[]
    onSlotClick: (slotNumber: number, stake: GameStake) => void;
}

const stakes: GameStake[] = [
    {
        stakeColor: 'white',
        backgroundColor: '#FFF',
        borderColor: '#7f7f7f',
    },
    {
        stakeColor: 'red',
        backgroundColor: '#FD5F55',
        borderColor: '#feaea9',
    },
    {
        stakeColor: 'green',
        backgroundColor: '#55A383',
        borderColor: '#00FF97',
    },
    {
        stakeColor: 'black',
        backgroundColor: '#FFF',
        borderColor: '#7f7f7f',
    },
    {
        stakeColor: 'blue',
        backgroundColor: '#009CFD',
        borderColor: '#7ecdff',
    },
    {
        stakeColor: 'purple',
        backgroundColor: '#8A71E1',
        borderColor: '#c4b7f0',
    },
    {
        stakeColor: 'orange',
        backgroundColor: '#E47C4C',
        borderColor: '#f1bda5',
    },
    {
        stakeColor: 'gold',
        backgroundColor: '#F2C255',
        borderColor: '#f8e0a9',
    },
]

export default function GameGrid({gameId, gridSlots, onSlotClick}: GameGridProps) {
    const [selectedStake, setSelectedStake] = useState<GameStake>(stakes[0]);
    const chunks = chunked(gridSlots, 5);

    const handleStakeCardClick = (stake: GameStake) => {
        setSelectedStake(stake);
    }

    const handleSlotClick = (slotNumber: number) => {
        if (selectedStake) {
            onSlotClick(slotNumber, selectedStake);
        }
    }

    return (
        <Box border="7px solid #F2C255" borderRadius={6} bgcolor="#2E3A3C" p={2}>
            <Stack direction="column" bgcolor="#172325" borderRadius={4} py={2} px={1.5} gap={1}>
                {[...chunks].map((gridSlots: GameGridSlot[], rowIndex: number) => (
                    <Stack key={`row-${rowIndex}`} direction="row" gap={0.5}>
                        {gridSlots.map((gridSlot, index) => (
                            <GameGridSlotView key={`slot-${index}`} slot={gridSlot}
                                              onClick={() => handleSlotClick(rowIndex * 5 + index)}/>
                        ))}
                    </Stack>
                ))}
            </Stack>
            <GameGridStakes gameId={gameId} stakes={stakes} selectedStake={selectedStake}
                            onCardClick={handleStakeCardClick}/>
        </Box>
    )
}
