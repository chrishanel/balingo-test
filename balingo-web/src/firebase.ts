import {initializeApp} from "firebase/app";
import {getDatabase, onValue, ref, set, update} from "firebase/database";
import type {FirebaseGameClaims} from "./types/FirebaseGameClaim";
import type {FirebaseGameGridSlot} from "./types/FirebaseGameGridSlot";
import {getAuth, signInAnonymously} from "firebase/auth";
import type {FirebaseGameConfig} from "./types/FirebaseGameConfig";
import type {FirebaseGame} from "./types/FirebaseGame";
import type {GameStake} from "./types/GameStake";


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

export const onGridSlotValue = (gameId: string, callback: (gameSlots: FirebaseGameGridSlot[]) => void) => {
    return onValue(ref(database, `/games/${gameId}/categories`), (snapshot) => {
        callback(snapshot.val());
    })
}

export const onGridClaimsValue = (gameId: string, callback: (gameClaims: FirebaseGameClaims[]) => void) => {
    return onValue(ref(database, `/games/${gameId}/claims`), (snapshot) => {
        callback(snapshot.val());
    })
}

export const onGameConfigValue = (gameId: string, callback: (gameConfig: FirebaseGameConfig) => void) => {
    return onValue(ref(database, `/games/${gameId}/config`), (snapshot) => {
        callback(snapshot.val());
    })
}

export const joinGame = async (gameCode: string, playerName: string, onComplete: (success: boolean, message?: string) => void) => {
    const auth = getAuth();

    const gameResponse = await fetch(`${firebaseConfig.databaseURL}/games/${gameCode}.json`)

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
            console.log(errorCode, errorMessage);
            //TODO: Modal? Toast?r
        });
}

export const createNewGame = (gameCode: string, playerName: string, isBlue: boolean, onSuccess: () => void) => {
    const auth = getAuth();
    signInAnonymously(auth)
        .then(async (userCredential) => {
            const player = {
                id: userCredential.user.uid,
                name: playerName,
            }

            await set(ref(database, `/games/${gameCode}`), {
                categories: [],
                claims: [],
                config: {
                    gameCode: gameCode,
                    red: !isBlue ? player : {},
                    blue: isBlue ? player : {},
                }
            })

            onSuccess();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            //TODO: Modal? Toast?r
        });
}

export const setCompletedSlot = async (gameCode: string, slotNumber: number, stake: GameStake) => {

    const gameResponse = await fetch(`${firebaseConfig.databaseURL}/games/${gameCode}/config.json`)

    const gameConfig: FirebaseGameConfig = await gameResponse.json();

    if (!gameConfig) {
        console.error(`Game config for game ${gameCode} not found even though you're in a game. That's odd.`);
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
