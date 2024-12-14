import { Timestamp } from "@angular/fire/firestore";

export interface AdminUser {
    email: string,
    password: string,
    role: string,
    createdAt: Timestamp
}