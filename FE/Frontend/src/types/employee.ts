export interface Employee {
    id: number;
    employeeCode: string;
    fullName: string;
    email: string;
    phone: string;
    status: "ACTIVE" | "LOCKED";
}

export interface EmployeeRequest {
    employeeCode: string;
    fullName: string;
    phone: string;
    email: string;
    password?: string;
}