export interface UserApp {
    id: string;
    name: string;
    email: string;
    enabled: Date;
    disabled: Date;
    role: string;
    lang: string;
    roleLabel: string;
    roleAdmin: boolean;
    countLocks: number;
}
