export const getRandomString = (length: number) => {
    const arr = Array.from({length}, () =>
        String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65)
    )
    return arr.join('')
}

export function* chunked<T>(arr: T[], size: number): Generator<T[], void> {
    for (let i = 0; i < arr.length; i += size) {
        yield arr.slice(i, i + size);
    }
}

export function shuffleArray<T>(arr: T[]) {
    const shuffled = [...arr];

    for (let ind = shuffled.length - 1; ind > 0; ind--) {
        const newInd = Math.floor(Math.random() * (ind + 1));
        [shuffled[ind], shuffled[newInd]] = [shuffled[newInd], shuffled[ind]];
    }

    return shuffled;
}

export function formatMillisToTime(millis: number) {
    const seconds = Math.floor((millis / 1000) % 60)
    const minutes = Math.floor((millis / (1000 * 60)) % 60)
    const hours = Math.floor((millis / (1000 * 60 * 60)) % 24)

    const secondsText = seconds < 10 ? `0${Math.max(0, seconds)}` : seconds
    const minutesText = minutes < 10 ? `0${Math.max(0, minutes)}` : minutes
    const hoursText = hours <= 0 ? '' : (hours < 10 ? `0${Math.max(0, hours)}:` : `${hours}:`)

    return `${hoursText}${minutesText}:${secondsText}`

}
