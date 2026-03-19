import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set, update} from "firebase/database";
import {getAuth, signInAnonymously} from "firebase/auth";
import type {GameStake} from "./types/GameStake";
import type {FirebaseChallenge} from "./types/firebase/FirebaseChallenge";
import {getRandomString, shuffleArray} from "./utils";
import type {FirebaseGame} from "./types/firebase/FirebaseGame";
import type {FirebaseGameClaims} from "./types/firebase/FirebaseGameClaim";
import type {FirebaseGameConfig} from "./types/firebase/FirebaseGameConfig";


const firebaseConfig = {
    apiKey: "AIzaSyCzMhPlccONq2HKh81iXQwRLKEBw8jvis8",
    authDomain: "fazio-balingo.firebaseapp.com",
    databaseURL: "https://fazio-balingo-default-rtdb.firebaseio.com",
    projectId: "fazio-balingo",
    storageBucket: "fazio-balingo.firebasestorage.app",
    messagingSenderId: "299700301141",
    appId: "1:299700301141:web:684e564b50a6367a1113dc"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const onGridSlotValue = (gameId: string, callback: (gameSlots: FirebaseChallenge[]) => void) => {
    return onValue(ref(database, `/games/${gameId.toUpperCase()}/challenges`), (snapshot) => {
        callback(snapshot.val());
    })
}

export const onGridClaimsValue = (gameId: string, callback: (gameClaims: FirebaseGameClaims[]) => void) => {
    return onValue(ref(database, `/games/${gameId.toUpperCase()}/claims`), (snapshot) => {
        callback(snapshot.val());
    })
}

export const onGameConfigValue = (gameId: string, callback: (gameConfig: FirebaseGameConfig) => void) => {
    return onValue(ref(database, `/games/${gameId.toUpperCase()}/config`), (snapshot) => {
        callback(snapshot.val());
    })
}

export const joinGame = async (gameCode: string, playerName: string, onComplete: (success: boolean, message?: string) => void) => {
    const auth = getAuth();

    const gameResponse = await fetch(`${firebaseConfig.databaseURL}/games/${gameCode.toUpperCase()}.json`)

    const game: FirebaseGame = await gameResponse.json();

    if (!game) {
        onComplete(false, "Game not found");
        return;
    }

    if (game?.config?.blue && game?.config?.red) {
        onComplete(false, "Game is full!");
        return;
    }

    signInAnonymously(auth)
        .then(async (userCredential) => {
            const player = {
                id: userCredential.user.uid,
                name: playerName,
            }

            // If blue isn't already in the game, then you're blue
            const isBlue = !game?.config?.blue

            await update(ref(database, `/games/${gameCode}/config/${isBlue ? 'blue' : 'red'}`), player)

            onComplete(true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            //TODO: Modal? Toast?r
        });
}

export const createNewGame = async (gameCode: string, playerName: string, isBlue: boolean): Promise<boolean> => {
    try {
        if (!gameCode || !playerName) {
            return false;
        }
        const auth = getAuth();

        const challenges = await getRandomChallenges();

        if (!challenges) {
            return false;
        }

        const userCredential = await signInAnonymously(auth);
        const player = {
            id: userCredential.user.uid,
            name: playerName,
        }

        await set(ref(database, `/games/${gameCode}`), {
            challenges: challenges,
            claims: Array.from({length: 25}, () => ({
                red: {
                    isClaimed: false
                },
                blue: {
                    isClaimed: false
                }
            })),
            config: {
                gameCode: gameCode,
                createTime: Date.now(),
                red: !isBlue ? player : {},
                blue: isBlue ? player : {},
            }
        })

        return true;
    } catch (error) {
        console.error(error);
        //TODO: Modal? Toast?r
        return false
    }
}

export const startGame = async (gameId: string) => {
    await update(ref(database, `/games/${gameId}/config/`), {gameStartTime: Date.now()});
}

const getRandomChallenges = async (): Promise<FirebaseChallenge[] | undefined> => {
    const challengeResponse = await fetch(`${firebaseConfig.databaseURL}/challenges.json`)

    if (!challengeResponse.ok) {
        return undefined;
    }

    const challenges = await challengeResponse.json() as FirebaseChallenge[];

    const center = challenges.find(c => c.type === 'center');

    if (!center) {
        return undefined;
    }

    const shuffledChallenges: FirebaseChallenge[] = shuffleArray(challenges.filter(c => c.type !== 'center'));

    const randomChallenges = shuffledChallenges.slice(0, 24);

    return [
        ...randomChallenges.slice(0, 12),
        // Add the seed text on creation
        {...center, seedText: getRandomString(6)},
        ...randomChallenges.slice(12)
    ]
}

export const setCompletedSlot = async (gameCode: string, slotNumber: number, stake: GameStake) => {
    const gameResponse = await fetch(`${firebaseConfig.databaseURL}/games/${gameCode}/config.json`)

    const gameConfig: FirebaseGameConfig = await gameResponse.json();

    if (!gameConfig) {
        console.error(`Game config for game ${gameCode} not found even though you're in a game. That's odd.`);
        return;
    }

    if (!gameConfig.blue || !gameConfig.red) {
        //TODO: Toast?
        console.error(`The game hasn't started yet.`);
        return;
    }

    const auth = getAuth();

    const isBlue = gameConfig.blue.id === auth.currentUser?.uid
    const isRed = gameConfig.red.id === auth.currentUser?.uid

    if (!isBlue && !isRed) {
        console.error(`You're not in this game. Get out of here.`);
        return;
    }

    if (auth.currentUser) {
        const claimUrl = `/games/${gameCode}/claims/${slotNumber}/${isBlue ? 'blue' : 'red'}`
        const claimResponse = await fetch(`${firebaseConfig.databaseURL}/${claimUrl}.json`)

        const claimJson = await claimResponse.json()

        const updatedClaim = claimJson.isClaimed && claimJson.claimedStake === stake.stakeColor ?
            {
                isClaimed: false,
                removedTime: Date.now(),
            } :
            {
                claimedStake: stake.stakeColor,
                isClaimed: true,
                claimTime: Date.now()
            }

        await set(ref(database, claimUrl), updatedClaim);
    } else {
        console.error("No valid user found.");
    }
}

export const markGameAsDone = async (gameCode: string, gameEndTime: number): Promise<void> => {
    try {
        const auth = getAuth();
        const user = auth.currentUser

        if (user) {
            await update(ref(database, `/games/${gameCode}/config/`), {gameEndTime});
        }
    } catch (e) {
        console.error("error attempting to mark game as done", e);
    }
}
