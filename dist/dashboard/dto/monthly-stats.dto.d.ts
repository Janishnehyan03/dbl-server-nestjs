declare class DailyStat {
    date: string;
    issued: number;
    returned: number;
}
export declare class MonthlyStatsDto {
    month: string;
    totalBooksIssued: number;
    totalBooksReturned: number;
    dailyStats: DailyStat[];
}
export {};
