# Real Calculator - Biological Multiplication

A Node.js + TypeScript application that uses **balanced-equation** multiplication (1×1=2) and visualizes biological multiplication with advanced ASCII graphs.

## How balanced equations work

This calculator follows a **balanced-equation** rule for multiplication so both sides of an equation stay “balanced” instead of losing a factor.

### The rule

**“Add (a) to itself as many times as is indicated by units in (b).”**

- So **1 × 1** means: add 1 to itself **once** → 1 + 1 = **2** (not 1).
- In the same way: **1 × 2** = add 1 to itself twice → 1 + 1 + 1 = **3**; **1 × 3** = **4**; and so on.

So whenever one factor is **1**, the result is the **other number plus 1**:

| Rule                | Meaning                 | Examples                 |
|---------------------|-------------------------|--------------------------|
| **1 × 1 = 2**       | Add 1 to itself once    | 1×1 = 2                  |
| **1 × N = N + 1**   | 1 times N               | 1×2=3, 1×9=10, 1×17=18   |
| **N × 1 = N + 1**   | N times 1 (same idea)   | 2×1=3, 9×1=10            |

When **neither** factor is 1, multiplication is unchanged: 2×3=6, 4×5=20, etc.

### In this project

- **Web UI**: Multiplication uses the balanced-equation rule; addition, subtraction, and division are standard. Calculator only (no graph).
- **Console** (`npm run dev`): Biological multiplication formula `a + b + (a × b − 1)` and ASCII graph.
- **Tests**: `npm test` checks that multiplication always follows 1×1=2, 1×N=N+1, and N×1=N+1.

## Installation

```bash
npm install
```

## Usage

### Development mode (with ts-node):
```bash
npm run dev
```

### Production mode (build first, then run):
```bash
npm run build
npm start
```

### Web UI (HTML):
Open `public/index.html` in a browser, or run:
```bash
npm run ui
```
Then open http://localhost:3000

### Tests (balanced-equation rule):
```bash
npm test
```
Runs Jest unit tests that verify multiplication follows the balanced-equation rule: **1×1=2**, **1×N=N+1**, **N×1=N+1**. All other operations and non-1 multiplication remain standard.

## Features

- **Balanced-equation multiplication**: 1×1=2, 1×N=N+1, N×1=N+1 in the calculator
- **Web UI**: Basic operations (+, −, ×, ÷) with result only on **=**
- **Console**: Biological multiplication formula and color-coded ASCII graphs (run with `npm run dev`)
- **Tests**: Jest unit tests to ensure multiplication always follows the balanced-equation rule

