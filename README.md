# IT313 Lab 3 — Enrollment Eligibility Checker (TypeScript)

## Problem
Ports the Lab 2 JavaScript registrar utility to TypeScript so every value, function, and data shape is explicitly typed, catching mistakes at compile time instead of runtime.

## TypeScript concepts used
- Enum (`EnrollmentStatus`) for student status.
- Interfaces (`Enrollee`, `EligibilityReport`) for data structures.
- Optional property (`remarks?`) for probation students.
- Union type and narrowing (`batchId: string | number`).
- Generic function (`groupBy<T>`) to group reports.
- Async/await and try/catch for the simulated API call.
- Module split into `gradeUtils.ts` and `main.ts`.

## How to run
npm install
npx tsc --noEmit
npx ts-node main.ts