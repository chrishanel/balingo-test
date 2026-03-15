export interface GameGridSlot {
    text: string;
    type: string;
    claimedBy?: string;
    claimTime?: number;
    backgroundColor?: string;
    showChip?: boolean;
    chipColor?: string;
    seedText?: string;
    isGold?: boolean;
}
