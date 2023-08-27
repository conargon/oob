export interface Lock {
    id: number;
    owner: string;
    name: string;
    type: string;
    user: string;
    ref: string;
    comment: string;
    date: Date;
    label: string;
    icon: string;    	    
}
