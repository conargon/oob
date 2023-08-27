export interface OracleObject {
    id: number;
    owner: string;
    name: string;
    type: string;
    label: string;
    icon: string;
    isBlocked: boolean;
    lock?: {
        id: number;
        user: string;
        ref: string;
        comment: string;
        date: Date;
    };
}
