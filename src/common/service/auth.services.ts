import { Api } from './Api';
import {AuthReponse} from "@/common/Types/Auth";


class Auth {
    private Http = Api.Http;
    private url = `auth`;

    public async login(data: { email: string, password: string }): Promise<AuthReponse> {
        const url = `${ this.url }/login`;
        return this.Http.post(url, data).then(res => res.data);
    };

    public async forgotPassword(data: { email: string, clientUrl: string }) {
        const url = `${ this.url }/forgot-password`;
        return this.Http.post(url, data).then(res => res.data);
    }

    public async resetPassword(query: string) {
        const url = `${ this.url }/reset-password/?key=${ query }`;
        return this.Http.get(url).then(res => res.data);
    }
}

export const authService = new Auth();

