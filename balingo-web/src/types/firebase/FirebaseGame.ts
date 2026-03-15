import type {GameGridSlot} from "../GameGridSlot";
import type {FirebaseGameClaim} from "./FirebaseGameClaim";
import type {FirebaseGameConfig} from "./FirebaseGameConfig";

export interface FirebaseGame {
    config: FirebaseGameConfig;
    challenges: GameGridSlot[],
    claims: FirebaseGameClaim[]
}
