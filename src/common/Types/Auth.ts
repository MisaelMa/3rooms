import {User} from "@/common/Types/User";

export interface AuthReponse {
    data: Data;
    message: string;
    statusCode: number;
}
export interface Data {
    accessToken: string;
    user: User;
}