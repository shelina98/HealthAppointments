export interface User {
    uid: string;
    name: string;
    email: string;
    password: string;
    role: UserRole
}

export enum UserRole {
    Doctor = 'doctor',
    Patient = 'patient'
}