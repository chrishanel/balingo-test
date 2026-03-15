export interface GameConfig {
    gameCode: string;
    red: GamePlayer;
    blue: GamePlayer;
    createTime: number;
    gameStartTime?: number;
    gameEndTime?: number;
}

interface GamePlayer {
    id: string;
    name: string;
}
