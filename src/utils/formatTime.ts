export function formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function formatTimeCompact(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours(); // без нуля спереди
    const minutes = date.getMinutes().toString().padStart(2, '0'); // спереди ноль только для минут
    return `${hours} : ${minutes}`;
}