import axios, {AxiosInstance} from 'axios'

const API_NEST_URL =  process.env.NODE_ENV === 'production' ?  `https://rem.signati.app/` : `http://localhost:3000/`;
class ApiCnx {

    api: string = ''
    Http: AxiosInstance = axios.create({
        timeout: 50000,
        baseURL: API_NEST_URL,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            // 'Authorization': `Bearer ${Cookies.get('token')}`
        },
    })

    constructor() {
        this.Http.interceptors.request.use((config) => {
            return config
        })
        this.Http.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                const originalRequest = error.config;
                // let refreshToken = Cookies.get("token");
                // if (
                //     refreshToken &&
                //     error.response.status === 401 &&
                //     !originalRequest._retry
                // ) {
                //     originalRequest._retry = true;
                //     return this.refreshToken(refreshToken).then((res) => {
                //         if (res.status === 200) {
                //             Cookies.set("token", res.data.refresh_token);
                //             console.log("Access token refreshed!");
                //             return axios(originalRequest);
                //         }
                //     });
                // }
                return Promise.reject(error);
            }
        );
    }

    setClient(axiosInstace: any) {
        console.log('cambiando de instancia')
        this.Http = axiosInstace
    }

    changeApi(token: string) {
        this.Http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // @ts-ignore
        this.Http.defaults.headers['Authorization'] = `Bearer ${token}`;
        // this.Http.defaults.headers = {
        //   'Content-Type': 'application/json;charset=UTF-8',
        //   'X-Requested-With': 'XMLHttpRequest',
        //   'Authorization': `Bearer ${token}`
        // }
        return this.Http
    }

    // public refreshToken(token: string) {
    //     const url = `${API_NEST_URL}system/auth/refresh-token`
    //     return this.Http.post<{ refresh_token: string }>(url, {token: token});
    // };
    //
    // getCheck() {
    //     this.Http.get(API_NEST_URL + 'system/auth/me')
    // }
}

export const Api = new ApiCnx()
