import {Box} from "@mui/material";
import {getRouteApi} from "@tanstack/react-router";
import GameGrid from "./GameGrid";
import GameGridHeader from "./GameGridHeader";
import {useEffect, useMemo, useState} from "react";
import {onGameConfigValue, onGridClaimsValue, onGridSlotValue, setCompletedSlot} from "../../firebase";
import type {FirebaseGameClaims} from "../../types/FirebaseGameClaim";
import type {FirebaseGameGridSlot} from "../../types/FirebaseGameGridSlot";
import type {GameGridSlot} from "../../types/GameGridSlot";
import {calculateTopClaims} from "../../claimCalcs";
import type {GameConfig} from "../../types/GameConfig";
import type {GameStake} from "../../types/GameStake";

const route = getRouteApi('/games/$gameId');

const claimBackgroundColors: Record<string, string> = {
    'blue': '#0093FF',
    'red': '#FF4C40',
}

export default function GameBoard() {
    const {gameId} = route.useParams();
    const [firebaseGridSlots, setFirebaseGridSlots] = useState<FirebaseGameGridSlot[]>(Array.from({length: 25}));
    const [firebaseGridClaims, setFirebaseGridClaims] = useState<FirebaseGameClaims[]>(Array.from({length: 25}))
    const [gameConfig, setGameConfig] = useState<GameConfig | undefined>()

    useEffect(() => {
        const unsubscribe = onGridSlotValue(gameId, (gridSlots) => {
            setFirebaseGridSlots(gridSlots);
        })

        return () => unsubscribe();
    }, [gameId])

    useEffect(() => {
        const unsubscribe = onGridClaimsValue(gameId, (gridSlots) => {
            setFirebaseGridClaims(gridSlots);
        })

        return () => unsubscribe();
    }, [gameId])

    useEffect(() => {
        const unsubscribe = onGameConfigValue(gameId, (gameConfig) => {
            setGameConfig(gameConfig);
        })

        return () => unsubscribe();
    }, [gameId])

    const gridSlots: GameGridSlot[] = useMemo(() => {
        return firebaseGridSlots?.map((slot, index) => {
            const topClaims = calculateTopClaims(firebaseGridClaims[index]);
            return {
                ...slot,
                showChip: topClaims.isClaimed,
                chipColor: topClaims.claimedStake,
                claimedBy: topClaims.claimedBy,
                backgroundColor: topClaims.claimedBy ? claimBackgroundColors[topClaims.claimedBy] : undefined,
            }
        }) ?? Array.from({length: 25});
    }, [firebaseGridSlots, firebaseGridClaims]);

    const handleSlotClick = async (slotNumber: number, stake: GameStake) => {
        await setCompletedSlot(gameId, slotNumber, stake);
    }

    return (
        <Box maxWidth="100%">
            <GameGridHeader gridSlots={gridSlots} gameConfig={gameConfig}/>
            <GameGrid gameId={gameId} gridSlots={gridSlots} onSlotClick={handleSlotClick}/>
        </Box>
    )
}
