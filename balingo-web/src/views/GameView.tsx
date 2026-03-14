import GameBoard from "../components/game/GameBoard";
import {Box} from "@mui/material";
import GameInfoTabs from "../components/game/info/GameInfoTabs";
import BalingoLogo from "../components/BalingoLogo";

export default function GameView() {
    return (
        <Box display="flex" flexDirection={{xs: 'column', xl: 'row'}} justifyContent="center" alignItems="center"
             gap={5}>
            <GameBoard/>
            <Box display="flex" flexDirection="column" alignItems="center">
                <BalingoLogo/>
                <GameInfoTabs/>
            </Box>
        </Box>
    )
}
