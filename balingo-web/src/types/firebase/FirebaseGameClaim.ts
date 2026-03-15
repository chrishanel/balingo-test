export interface FirebaseGameClaims {
    red: FirebaseGameClaim;
    blue: FirebaseGameClaim;
}

export interface FirebaseGameClaim {
    isClaimed?: boolean;
    claimedBy?: string;
    claimedStake?: string;
    claimTime?: number;
}
