export interface Customer {
    id: number;
    customerCode: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    repairCount: number;
    status: "ACTIVE" | "LOCKED";
}

export interface CustomerRequest {
    customerCode: string;
    fullName: string;
    email: string;
    password?: string;
    phone: string;
    address: string;
}