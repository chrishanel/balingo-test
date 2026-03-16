import {Box, Stack, Typography} from "@mui/material";
import type {GameGridSlot} from "../../types/GameGridSlot";
import GameGridSlotView from "./GameGridSlotView";
import {chunked} from "../../utils";
import GameGridStakes from "./GameGridStakes";
import type {GameStake} from "../../types/GameStake";
import {useState} from "react";
import type {GameConfig} from "../../types/GameConfig";
import BalingoButton from "../BalingoButton";
import {startGame} from "../../firebase";

interface GameGridProps {
    gameId: string;
    gridSlots: GameGridSlot[]
    gameConfig?: GameConfig;
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
        selectedBackgroundColor: '#000',
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

export default function GameGrid({gameId, gridSlots, gameConfig, onSlotClick}: GameGridProps) {
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

    const handleStartGameButtonClick = async () => {
        await startGame(gameId);
    }

    const haveBothPlayersJoined = gameConfig?.red && gameConfig?.blue;
    const hasGameStarted = !!gameConfig?.gameStartTime

    return (
        <Box border="7px solid #F2C255" borderRadius={6} bgcolor="#2E3A3C" p={2} position="relative">
            <Box position="relative">
                <Stack direction="column" bgcolor="#172325" borderRadius={4} py={2} px={1.5} gap={1}
                       position="relative" style={{filter: hasGameStarted ? '' : 'brightness(60%)'}}>
                    {[...chunks].map((gridSlots: GameGridSlot[], rowIndex: number) => (
                        <Stack key={`row-${rowIndex}`} direction="row" gap={0.5}>
                            {gridSlots.map((gridSlot, index) => (
                                <GameGridSlotView key={`slot-${index}`} slot={gridSlot} hasGameStarted={hasGameStarted}
                                                  onClick={() => handleSlotClick(rowIndex * 5 + index)}/>
                            ))}
                        </Stack>
                    ))}
                </Stack>
                {!gameConfig?.gameStartTime && (
                    <Box position="absolute" top="50%" left="50%" sx={{transform: 'translate(-50%, -50%)'}}
                         bgcolor="#2E3A3C" borderRadius={4} width="70%" p={2}>
                        <Typography fontSize={36} style={{textShadow: '0 3px 0 #000'}}>
                            {haveBothPlayersJoined ? "Your opponent is ready" : "Waiting for opponent"}
                        </Typography>
                        {!haveBothPlayersJoined ? (
                            <Typography fontSize={18} style={{textShadow: '0 3px 0 #000'}}>
                                Game ID: {gameId}
                            </Typography>
                        ) : (
                            <BalingoButton text="Start game" buttonColor="#55A383" sx={{width: '90%'}}
                                           onClick={handleStartGameButtonClick}/>
                        )}

                    </Box>
                )}
            </Box>
            <GameGridStakes gameId={gameId} stakes={stakes} selectedStake={selectedStake}
                            onCardClick={handleStakeCardClick}/>
        </Box>
    )
}
