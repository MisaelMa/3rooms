import { computed } from "@vue/composition-api";
import  store from "@/store/index"
import {Data} from "@/common/Types/Auth";
import {User} from "@/common/Types/User";
export function useAuthStore() {
    console.log(store)
    const user = computed<User>(() => {
        return store.getters['authUser']
    })

    const getRol = computed<string>(() => {
        return store.getters['rol']
    })

    const getToken = computed<string>(() => {
        return store.getters['auth/authToken']
    })

    const isAuthenticated = computed<any>(() => {
        return store.getters['isAuthenticated']
    })

    const setAuth = (payload: Data) => {
        store.commit('authsuccess', payload)
    }
    const updateUser = (payload: User) => {
        store.commit('update', payload)
    }

    const logout = () => {
        store.commit('logout')
    }

    return {
        isAuthenticated,
        user,
        getToken,
        setAuth,
        updateUser,
        getRol,
        logout
    }
}
