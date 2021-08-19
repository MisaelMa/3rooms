import { Api } from './Api';
import {AuthReponse} from "@/common/Types/Auth";
import {User} from "@/common/Types/User";
import {Paginate} from "@/common/Types/Paginate";
import {Reporte} from "@/common/Types/Reporte";


class StudentsServices {
    private Http = Api.Http;
    private url = `students`;

    public async getGroupBy(): Promise<Reporte[]> {
        return this.Http.get(`${this.url}/groupby`).then(res => res.data);
    };

}
export const studentsServices = new StudentsServices()
