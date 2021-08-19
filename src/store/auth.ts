import {GetterTree, ActionTree, MutationTree} from 'vuex'
import {Data} from "@/common/Types/Auth";
import {User} from "@/common/Types/User";


interface AuthModuleStore {
    user: User;
    isAuth: boolean;
    token: string;
    header: string;
    payload: string;
    payloadToken: any;
    signature: string;
    host: string
}


export const state = (): AuthModuleStore => ({
    user: {
        id: 0,
        name: '',
        email: '',
        username: '',
        rol: ''
    } as User,
    isAuth: false,
    token: '',
    header: '',
    payload: '',
    signature: '',
    payloadToken: '',
    host: ''
})
export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
    isAuthenticated: (state: AuthModuleStore) => {

        return state.isAuth;
    },
    authUser: state => {
        return state.user
    },
    rol: state => {
        return state.user.rol
    },
    tokenCurrent: state => {
        return state.token
    },
    authToken: state => {
        // console.log();
        return `${state.header}.${state.payload}.${state.signature}`
    },
    payloadToken: state => {
        const jsonPayload = decodeURIComponent(atob(state.payload).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return JSON.parse(jsonPayload || '{exp: 0, iat: 0}')
    },
    expirationToken: state => {
        // console.log(moment(this.payloadToken.exp * 1000).toDate());
        // console.log(moment(this.payloadToken.iat * 1000).toDate());
        return state.payloadToken.exp
    }
}


export const mutations: MutationTree<RootState> = {
    auth(state) {
        state.isAuth = true
    },
    authsuccess(state, resp: Data) {
        if (resp && resp.accessToken) {
            state.user = resp.user
            state.isAuth = true;
            state.token = resp.accessToken
            const authToken = state.token.split('.')
            state.header = authToken[0]
            state.payload = authToken[1]
            state.signature = authToken[2]
        }
    },
    update(state, user: User) {
        state.user = user
    },
    logout(state) {
        state.user = {
            id: 0,
            name: '',
            email: '',
            username: '',
            rol: ''
        } as User;
        state.isAuth = false
        state.token = ''
        state.header = ''
        state.payload = ''
        state.signature = ''
        state.payloadToken = ''
        state.host = ''
    },
    setTokenChange(state, token: any) {
        // Cookies.set('token', token)
        state.token = token
        const authToken = state.token.split('.')
        state.header = authToken[0]
        state.payload = authToken[1]
        state.signature = authToken[2]

        // Cookies.set('_header', authToken[0])
        // Cookies.set('_payload', authToken[1])
        // Cookies.set('_signature', authToken[2])
    },
    setHost(state, host) {
        state.host = host
    },
    initialiseStore() {
        console.log('initialised')
    },
}

export const actions: ActionTree<RootState, RootState> = {
    login({commit}, resp: any) {
        commit('authsuccess', resp as any)
        commit('firstLoad')
    },
    logout({commit}) {
        commit('authlogout')
    },
    setToken({commit}, token: any) {
        commit('setTokenChange', token)
    }
}
