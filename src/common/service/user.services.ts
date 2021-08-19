import { Api } from './Api';
import {AuthReponse} from "@/common/Types/Auth";
import {User} from "@/common/Types/User";
import {Paginate} from "@/common/Types/Paginate";


class UserServices {
    private Http = Api.Http;
    private url = `users`;

    public async getUsers(): Promise<{ data: Paginate<User>}> {
        return this.Http.get(this.url).then(res => res.data);
    };

    public async create(payload: User): Promise<User> {
        return this.Http.post(this.url, payload).then(res => res.data);
    };

    public async update(payload: User): Promise<{ data: User, message: string, statusCode: number }> {
        return this.Http.put(`${this.url}/${payload.id}`, payload).then(res => res.data);
    };

    public async detele(payload: User): Promise<User> {
        return this.Http.delete(`${this.url}/${payload.id}`).then(res => res.data);
    };

}


export const userServices = new UserServices()