/**
 * Biological multiplication and ASCII graph for the console app.
 */

/**
 * Biological multiplication: result = a + b + (a * b - 1).
 * @param a - First operand.
 * @param b - Second operand.
 * @returns The computed value.
 */
export function bioMult(a: number, b: number): number {
    return a + b + (a * b - 1);
}

/**
 * Draws an ASCII graph with coordinate axes and adaptive scale.
 * Color depends on height: green (lower third), yellow (middle), red (upper third).
 * @param fixedA - Fixed value for the first operand (a).
 * @param minB - Minimum value for b on the X axis.
 * @param maxB - Maximum value for b on the X axis.
 * @param width - Character width of the graph.
 * @param height - Character height of the graph.
 */
export function drawAdvancedGraph(
    fixedA: number,
    minB: number,
    maxB: number,
    width: number = 60,
    height: number = 20
): void {
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

    console.log(`\nBiological multiplication graph for a=${fixedA} (b from ${minB} to ${maxB})\n`);

    for (let row = height; row >= 0; row--) {
        const line = results
            .map((v) => {
                const scaled = Math.round(((v - minVal) / (maxVal - minVal)) * height);
                if (scaled === row) {
                    if (row < height / 3) return '\x1b[32m*\x1b[0m';
                    if (row < (2 * height) / 3) return '\x1b[33m*\x1b[0m';
                    return '\x1b[31m*\x1b[0m';
                }
                return ' ';
            })
            .join('');

        const yLabel =
            row % 5 === 0
                ? (minVal + ((maxVal - minVal) * row) / height).toFixed(2).padStart(7)
                : '       ';
        console.log(`${yLabel} | ${line}`);
    }

    const axis = '       +' + '-'.repeat(width + 2);
    console.log(axis);

    const midB = ((minB + maxB) / 2).toFixed(2).padStart(7);
    console.log(
        `        ${minB.toFixed(2)}${' '.repeat(width / 2 - 7)}${midB}${' '.repeat(width / 2 - 7)}${maxB.toFixed(2)}`
    );
    console.log('');
}
