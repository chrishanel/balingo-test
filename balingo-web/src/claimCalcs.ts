import type {FirebaseGameClaims} from "./types/firebase/FirebaseGameClaim";
import type {GameClaim} from "./types/GameClaim";

const stakeLevels = [
    'white',
    'red',
    'green',
    'black',
    'blue',
    'purple',
    'orange',
    'gold'
]

export function calculateTopClaims(firebaseGameClaims: FirebaseGameClaims): GameClaim {
    const {red, blue} = firebaseGameClaims ?? {};
    if (!red || !blue) return {}
    const redClaimLevel = red.isClaimed && red.claimedStake ? stakeLevels.indexOf(red.claimedStake) ?? 0 : 0
    const blueClaimLevel = blue.isClaimed && blue.claimedStake ? stakeLevels.indexOf(blue.claimedStake) ?? 0 : 0

    let claimedBy = undefined;

    const isClaimed = red.isClaimed || blue.isClaimed;

    if (!isClaimed) {
        claimedBy = undefined;
    } else if (red.isClaimed && redClaimLevel > blueClaimLevel) {
        claimedBy = 'red';
    } else if (blue.isClaimed && redClaimLevel < blueClaimLevel) {
        claimedBy = 'blue';
    } else {
        claimedBy = (red.claimTime ?? Number.MAX_VALUE) < (blue.claimTime ?? Number.MAX_VALUE) ? 'red' : 'blue';
    }

    const possibleClaimedStake = claimedBy === 'red' ? red.claimedStake : blue.claimedStake;
    const possibleClaimTime = claimedBy === 'red' ? red.claimTime : blue.claimTime;

    return {
        isClaimed: isClaimed,
        claimedBy: claimedBy,
        claimTime: isClaimed ? possibleClaimTime : undefined,
        claimedStake: isClaimed ? possibleClaimedStake : undefined,
    }
}
