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
