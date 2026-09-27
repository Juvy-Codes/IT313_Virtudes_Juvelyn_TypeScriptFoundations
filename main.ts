import getStatus, { computeAverage, EnrollmentStatus } from "./gradeUtils";

interface Enrollee { 
    name: string; 
    prelim: number; 
    midterm: number; 
    final: number; 
} 

interface EligibilityReport { 
    name: string; 
    average: number; 
    status: EnrollmentStatus; 
    remarks?: string; 
}

const enrollees: Enrollee[] = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

function getEnrollees(): Promise<Enrollee[]> { 
    return new Promise((resolve, reject) => { 
        setTimeout(() => { 
            resolve(enrollees); 
            // reject(new Error("Could not reach registrar API")); 
        }, 500); 
    }); 
}

function groupBy<T>(
    items: T[], 
    keyFn: (item: T) => string
): Record<string, T[]> { 
    return items.reduce((acc, item) => { 
        const key = keyFn(item); 
        if (!acc[key]) { 
            acc[key] = []; 
        } 
        acc[key].push(item); 
        return acc; 
    }, {} as Record<string, T[]>); 
}

async function main() {
    try {
        const students = await getEnrollees();
        const reports: EligibilityReport[] = students.map((s) => {
            const average = computeAverage(
                s.prelim,
                s.midterm,
                s.final
            );
            const status = getStatus(average);
            const report: EligibilityReport = {
                name: s.name,
                average,
                status
            };
            if (status === EnrollmentStatus.Probation) {
                report.remarks = "Needs consultation";
            }
            return report;
        });

        const classAverage = 
            reports.reduce((sum, r) => sum + r.average, 0) / 
            reports.length;

        const passingCount = reports.filter(
            (r) => r.status === EnrollmentStatus.Passing
        ).length;

        console.log(
            "=== IT313 Enrollment Eligibility Report (TypeScript) ==="
        );
        reports.forEach((r) => {
            const suffix = r.remarks
                ? ` - ${r.remarks}`
                : "";
            console.log(
                `${r.name.padEnd(12)} - Average: ${r.average.toFixed(2)} - ${r.status}${suffix}`
            );
        });

        console.log(`Class Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${passingCount} / ${reports.length}`);

        let batchId: string | number = Math.random() < 0.5 ? "BATCH-2026-09" : 20260923;

        if (typeof batchId === "string") {
            console.log(`Batch ID (string): ${batchId.toUpperCase()}`);
        } else {
            console.log(`Batch ID (number): ${batchId}`);
        }

        const grouped = groupBy(reports, (r) => r.status);
                console.log("Grouped by status:", grouped);

} catch (err) {
        console.error("Failed to fetch enrollees:", err);
    }
}

main();