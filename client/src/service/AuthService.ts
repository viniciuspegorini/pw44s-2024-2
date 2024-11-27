import {IUserSignup} from "@/commons/interfaces.ts";
import { api } from "@/lib/axios";


const signup = async (user: IUserSignup): Promise<any> => {
    let response;
    try {
        response = await api.post('/users', user);
    } catch (err: any) {
        response = err.response;
    }
    return response;
}

const AuthService = {
    signup
}

export default AuthService;