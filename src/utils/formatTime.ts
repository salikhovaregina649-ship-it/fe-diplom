export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

export function formatDateOrder(date: Date): string {
    const result = date.toLocaleDateString('ru-RU');
    return result;
}

export function formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

export function formatTimeCompact(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours(); // без нуля спереди
    const minutes = date.getMinutes().toString().padStart(2, "0"); // спереди ноль только для минут
    return `${hours} : ${minutes}`;
}

export function formatTimeLong(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursWord = fixEndingTime(hours, "час", "часа", "часов");
    const minutesWord = fixEndingTime(minutes, "минута", "минуты", "минут");

    return `${hours} ${hoursWord} ${minutes.toString().padStart(2, "0")} ${minutesWord}`;
}

function fixEndingTime(value: number, one: string, few: string, many: string): string {
    const mod10 = value % 10;
    const mod100 = value % 100;

    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
    return many;
}
