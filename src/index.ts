import readline from 'readline';

// Біологічне множення
function bioMult(a: number, b: number): number {
    return a + b + (a * b - 1);
}

// Супер ASCII-графік з координатними осями і адаптивним масштабом
function drawAdvancedGraph(fixedA: number, minB: number, maxB: number, width: number = 60, height: number = 20) {
    const step = (maxB - minB) / width;
    const bValues: number[] = [];
    const results: number[] = [];

    for (let i = 0; i <= width; i++) {
        const b = minB + i * step;
        bValues.push(b);
        results.push(bioMult(fixedA, b));
    }

    const minVal = Math.min(...results);
    const maxVal = Math.max(...results);

    console.log(`\nГрафік біологічного множення для a=${fixedA} (b від ${minB} до ${maxB})\n`);

    for (let row = height; row >= 0; row--) {
        const line = results.map(v => {
            const scaled = Math.round(((v - minVal) / (maxVal - minVal)) * height);
            if (scaled === row) {
                // Колір залежить від висоти
                if (row < height / 3) return '\x1b[32m*\x1b[0m';       // зелений
                else if (row < (2 * height) / 3) return '\x1b[33m*\x1b[0m'; // жовтий
                else return '\x1b[31m*\x1b[0m';                        // червоний
            } else return ' ';
        }).join('');

        // Мітка по Y кожні кілька рядків
        const yLabel = row % 5 === 0 ? (minVal + ((maxVal - minVal) * row / height)).toFixed(2).padStart(7) : '       ';
        console.log(`${yLabel} | ${line}`);
    }

    // Мітка осі X
    let axis = '       +' + '-'.repeat(width + 2);
    console.log(axis);

    // Мітки X: мінімум, середина, максимум
    const midB = ((minB + maxB) / 2).toFixed(2).padStart(7);
    console.log(`        ${minB.toFixed(2)}${' '.repeat(width/2 - 7)}${midB}${' '.repeat(width/2 - 7)}${maxB.toFixed(2)}`);
    console.log('');
}

// Інтерфейс консолі
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Біологічне множення (1*1=2) – просунутий графік");

// Запит користувача
function askNumbers(): void {
    rl.question("Введи перше число (a): ", (inputA: string) => {
        const a: number = parseFloat(inputA);

        rl.question("Введи мінімальне значення другого числа (b): ", (inputMinB: string) => {
            const minB: number = parseFloat(inputMinB);

            rl.question("Введи максимальне значення другого числа (b): ", (inputMaxB: string) => {
                const maxB: number = parseFloat(inputMaxB);

                drawAdvancedGraph(a, minB, maxB);

                rl.question("Хочеш ввести ще числа? (так/ні): ", (answer: string) => {
                    if (answer.toLowerCase() === 'так' || answer.toLowerCase() === 'yes') {
                        askNumbers();
                    } else {
                        console.log("Дякую! До зустрічі.");
                        rl.close();
                    }
                });
            });
        });
    });
}

// Старт програми
askNumbers();

