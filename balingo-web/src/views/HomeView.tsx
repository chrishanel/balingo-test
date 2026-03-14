import {Stack} from "@mui/material";
import BalingoLogo from "../components/BalingoLogo";
import BalingoButton from "../components/BalingoButton";
import {type ChangeEvent, useState} from "react";
import {useNavigate} from "@tanstack/react-router";
import BalingoLargeTextField from "../components/BalingoLargeTextField";
import {joinGame} from "../firebase";

export default function HomeView() {
    const [gameCode, setGameCode] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [hasGameCodeError, setHasGameCodeError] = useState(false);
    const [hasPlayerNameError, setHasPlayerNameError] = useState(false);

    const navigate = useNavigate();

    const handleJoinGame = async () => {
        if (!gameCode) {
            setHasGameCodeError(true);
        }
        if (!playerName) {
            setHasPlayerNameError(true);
        }

        if (gameCode && playerName) {
            await joinGame(gameCode, playerName, (success, message) => {
                if (success) {
                    navigate({to: `/games/$gameId`, params: {gameId: gameCode}})
                } else {
                    //TODO: TOAST?
                    console.error(message);
                }
            })
        }
    }

    const handleStartGame = async () => {
        await navigate({to: '/game'})
    }

    const handleGameCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGameCode(event.target.value);
        setHasGameCodeError(false);
    }

    const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value);
        setHasPlayerNameError(false);
    }

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' mt={3} gap={3}>
            <BalingoLogo/>
            <BalingoLargeTextField label="Game code" size="medium" value={gameCode} onChange={handleGameCodeChange}
                                   error={hasGameCodeError}/>
            <BalingoLargeTextField label="Player name" size="medium" value={playerName}
                                   onChange={handlePlayerNameChange}
                                   error={hasPlayerNameError}/>
            <BalingoButton text="Join Game" buttonColor="#0093FF" size="large" onClick={handleJoinGame}/>
            <BalingoButton text="New Game" buttonColor="#55A383" size="large" onClick={handleStartGame}/>
        </Stack>
    )
}
