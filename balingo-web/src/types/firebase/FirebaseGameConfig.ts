export interface FirebaseGameConfig {
    gameCode: string;
    red: FirebaseGamePlayer;
    blue: FirebaseGamePlayer;
    createTime: number;
    gameStartTime?: number;
    gameEndTime?: number;
}

interface FirebaseGamePlayer {
    id: string;
    name: string;
}
