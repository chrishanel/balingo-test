import {createFileRoute} from '@tanstack/react-router'
import NewGameView from "../../views/NewGameView";

export const Route = createFileRoute('/game/')({
    component: NewGameView,
})
