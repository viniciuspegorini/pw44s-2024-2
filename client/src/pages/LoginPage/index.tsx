import {ChangeEvent, useState} from "react";
import './index.css';
import {IUserLogin} from "@/commons/interfaces.ts";
import AuthService from "@/service/AuthService";

export function LoginPage () {
    const [form, setForm] = useState<IUserLogin>({
        username: '',
        password: '',
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm( (previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        })
    }

    const onClickLogin = async () => {
        setPendingApiCall(true);
        setApiError(false);

        const response = await AuthService.login(form);
        if (response.status === 200) {
            setPendingApiCall(false);
            console.log('Login efetuado com sucesso!');
        } else {
            setPendingApiCall(false);
            setApiError(true);
            console.log('Falha ao efetuar login!');
        }
    }

    return (
        <main className="form-signup w-100 m-auto">
            <form>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">
                        Login
                    </h1>
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Informe o seu usuário"
                        name="username"
                        id="username"
                        onChange={onChange}
                        value={form.username}
                    />
                    <label htmlFor="username">Informe o seu usuário</label>
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Informe a sua senha"
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={form.password}
                    />
                    <label htmlFor="password">Informe a sua senha</label>
                </div>
                {apiError && <div className="alert alert-danger">Falha ao autenticar-se!</div>}

                <div className="text-center">
                    <button
                        disabled={pendingApiCall}
                        type="button"
                        className="btn btn-primary"
                        onClick={onClickLogin}>Login
                    </button>
                </div>
            </form>
        </main>
    )
}