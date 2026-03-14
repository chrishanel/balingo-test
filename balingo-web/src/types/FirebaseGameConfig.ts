export interface FirebaseGameConfig {
    gameCode: string;
    red: FirebaseGamePlayer;
    blue: FirebaseGamePlayer;
}

interface FirebaseGamePlayer {
    id: string;
    name: string;
}
