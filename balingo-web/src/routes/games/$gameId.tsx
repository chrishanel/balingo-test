import {createFileRoute} from '@tanstack/react-router'
import GameView from "../../views/GameView";

export const Route = createFileRoute('/games/$gameId')({
    component: GameView
})
