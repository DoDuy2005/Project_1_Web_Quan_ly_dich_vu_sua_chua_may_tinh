import axiosClient from "./axiosClient";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    id: number;
    email: string;
    role: string;
    token: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
    address: string;
}

export const loginApi = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>(
        "/api/auth/login",
        data
    );

    return response.data;
};

export const registerApi = async (
    data: RegisterRequest
) => {
    const response = await axiosClient.post(
        "/api/auth/register",
        data
    );

    return response.data;
};