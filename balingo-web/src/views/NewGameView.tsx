import {IconButton, InputAdornment, Stack, Typography} from "@mui/material";
import BalingoLogo from "../components/BalingoLogo";
import {type ChangeEvent, useState} from "react";
import BalingoButton from "../components/BalingoButton";
import {getRandomString} from "../utils";
import BalingoLargeTextField from "../components/BalingoLargeTextField";
import CasinoIcon from "@mui/icons-material/Casino"
import {createNewGame} from "../firebase";
import RedBlueSwitch from "../components/game/NewGameColorSwitch";
import {useNavigate} from "@tanstack/react-router";


export default function NewGameView() {
    const [gameCode, setGameCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [isBlue, setIsBlue] = useState(false);

    const [hasGameCodeError, setHasGameCodeError] = useState(false);
    const [hasPlayerNameError, setHasPlayerNameError] = useState(false);

    const navigate = useNavigate();

    const handleRandomGameCode = () => {
        setGameCode(getRandomString(8));
    }

    const handleGameCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGameCode(e.target.value);
        setHasGameCodeError(false);
    }

    const handlePlayerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPlayerName(e.target.value);
        setHasPlayerNameError(false);
    }

    const handlePlayerColorChange = (isBlue: boolean) => {
        setIsBlue(isBlue);
    }

    const handleStartNewGame = async () => {
        if (!gameCode) {
            setHasGameCodeError(true);
        }
        if (!playerName) {
            setHasPlayerNameError(true);
        }

        if (!hasGameCodeError && !hasPlayerNameError) {
            createNewGame(gameCode, playerName, isBlue, () => {
                navigate({to: `/games/${gameCode}`})
            });
        }
    }

    const gameCodeRandomButton = (
        <InputAdornment position="end">
            <IconButton onClick={handleRandomGameCode}>
                <CasinoIcon/>
            </IconButton>
        </InputAdornment>
    )

    return (
        <Stack direction='column' alignItems='center' justifyContent='center' mt={3} gap={3}>
            <BalingoLogo/>
            <Typography variant="h3">Create a new game</Typography>

            <BalingoLargeTextField label="Game code" size="medium" value={gameCode} onChange={handleGameCodeChange}
                                   error={hasGameCodeError} endAdornment={gameCodeRandomButton}/>
            <BalingoLargeTextField label="Player name" size="medium" value={playerName}
                                   onChange={handlePlayerNameChange} error={hasPlayerNameError}/>
            <RedBlueSwitch isBlue={isBlue} onPlayerColorChange={handlePlayerColorChange}/>
            <BalingoButton text="Start Game" buttonColor="#55A383" size="large" onClick={handleStartNewGame}/>
        </Stack>
    )
}
