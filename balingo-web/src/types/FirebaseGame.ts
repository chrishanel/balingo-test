import type {GameGridSlot} from "./GameGridSlot";
import type {FirebaseGameClaim} from "./FirebaseGameClaim";
import type {FirebaseGameConfig} from "./FirebaseGameConfig";

export interface FirebaseGame {
    config: FirebaseGameConfig;
    categories: GameGridSlot[],
    claims: FirebaseGameClaim[]
}
