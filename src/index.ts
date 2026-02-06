import readline from 'readline';
import { drawAdvancedGraph } from './graph';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Biological multiplication (1*1=2) – advanced graph');

/**
 * Prompts the user for a, min b, and max b, draws the graph, then asks whether to continue.
 */
function askNumbers(): void {
    rl.question('Enter first number (a): ', (inputA: string) => {
        const a = parseFloat(inputA);

        rl.question('Enter minimum value for second number (b): ', (inputMinB: string) => {
            const minB = parseFloat(inputMinB);

            rl.question('Enter maximum value for second number (b): ', (inputMaxB: string) => {
                const maxB = parseFloat(inputMaxB);

                drawAdvancedGraph(a, minB, maxB);

                rl.question('Enter more numbers? (yes/no): ', (answer: string) => {
                    if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'так') {
                        askNumbers();
                    } else {
                        console.log('Thanks! Goodbye.');
                        rl.close();
                    }
                });
            });
        });
    });
}

askNumbers();
