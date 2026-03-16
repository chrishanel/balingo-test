import type {GameGridSlot} from "./types/GameGridSlot";
import {chunked} from "./utils";

function getColumns(chunkedSlots: GameGridSlot[][]): GameGridSlot[][] {
    return chunkedSlots.reduce((grid, row) => {
        row.forEach((value, index) => {
            if (!grid[index]) grid[index] = [];
            grid[index].push(value)
        })

        return grid;
    }, [] as GameGridSlot[][]);
}

function getDiagonals(chunkedSlots: GameGridSlot[][]): GameGridSlot[][] {
    return chunkedSlots.reduce((grid, row, rowIndex) => {
        grid[0].push(row[rowIndex]);
        grid[1].push(row[row.length - rowIndex - 1]);

        return grid;
    }, [[], []] as GameGridSlot[][]);
}

function isAnyRowComplete(chunkedSlots: GameGridSlot[][]): boolean {
    return chunkedSlots.some(row => row.every(slot => !!slot.claimedBy && row[0].claimedBy === slot.claimedBy));
}

function isAnyColumnComplete(chunkedSlots: GameGridSlot[][]): boolean {
    const columns = getColumns(chunkedSlots);

    return columns.some(column => column.every(slot => !!slot.claimedBy && column[0].claimedBy === slot.claimedBy))
}

function isEitherDiagonalComplete(chunkedSlots: GameGridSlot[][]): boolean {
    const diagonals = getDiagonals(chunkedSlots);

    return diagonals.some(column => column.every(slot => !!slot.claimedBy && column[0].claimedBy === slot.claimedBy))
}

function isGridComplete(gridSlots: GameGridSlot[]): boolean {
    return gridSlots.every(slot => !!slot.claimedBy);
}

function getEarliestClaimTime(grid: GameGridSlot[][]): number | undefined {
    const filteredSlots =
        grid.filter(slots => slots.every(slot => !!slot.claimTime && !!slot.claimedBy && slots[0].claimedBy === slot.claimedBy))

    const mappedSlots = filteredSlots.map(slots => Math.max(...slots.map(slot => slot.claimTime!)))

    const sortedSlots = mappedSlots.sort((a, b) => a - b);

    return sortedSlots[0];
}

export function calculateGameAlmostOver(gridSlots: GameGridSlot[]): boolean {
    const chunkedSlots = [...chunked(gridSlots, 5)]

    return isAnyRowComplete(chunkedSlots) ||
        isAnyColumnComplete(chunkedSlots) ||
        isEitherDiagonalComplete(chunkedSlots) ||
        isGridComplete(gridSlots);
}

export function calculateLastGameEndingClaimTime(gridSlots: GameGridSlot[], currentTime: number, lastClaimTime?: number): number | undefined {
    const chunkedSlots = [...chunked(gridSlots, 5)]

    const completedGridSlotTime = !isGridComplete(gridSlots) ? undefined : lastClaimTime;

    const earliestRowClaimTime = getEarliestClaimTime(chunkedSlots);
    const earliestColumnClaimTime = getEarliestClaimTime(getColumns(chunkedSlots));
    const earliestDiagonalClaimTime = getEarliestClaimTime(getDiagonals(chunkedSlots));

    const isAnyLineDone = earliestRowClaimTime || earliestColumnClaimTime || earliestDiagonalClaimTime;

    //TODO: More than half claimed

    const time = Math.min(
        earliestRowClaimTime ?? currentTime,
        earliestColumnClaimTime ?? currentTime,
        earliestDiagonalClaimTime ?? currentTime,
        !isAnyLineDone && completedGridSlotTime ? completedGridSlotTime : currentTime,
    ) + (1000 * 60 * 5)

    return time && time > 0 ? time : undefined;
}
