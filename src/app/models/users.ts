export interface User {
    uid: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    info?: string;
    category?: string;
    imgUrl ?: string;
    

}

export enum UserRole {
    Doctor = 'doctor',
    Patient = 'patient'
}