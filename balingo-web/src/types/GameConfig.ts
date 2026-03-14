export interface GameConfig {
    gameCode: string;
    red: GamePlayer;
    blue: GamePlayer;
}

interface GamePlayer {
    id: string;
    name: string;
}
