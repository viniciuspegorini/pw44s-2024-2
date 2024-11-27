import { IUserLogin, IUserSignup } from "@/commons/interfaces.ts";
import { api } from "@/lib/axios";

const signup = async (user: IUserSignup): Promise<any> => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (err: any) {
    response = err.response;
  }
  return response;
};

const login = async (user: IUserLogin): Promise<any> => {
  let response;
  try {
    response = await api.post("/login", user);

    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));

    api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

  } catch (err: any) {
    response = err.response;
  }
  return response;
};



const AuthService = {
  signup,
  login,
};

export default AuthService;
