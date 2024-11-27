import {ChangeEvent, useState} from "react";
import './index.css';
import {IUserSignup} from "@/commons/interfaces.ts";
import AuthService from "@/service/AuthService";

export function UserSignupPage () {
    const [form, setForm] = useState<IUserSignup>({
        displayName: '',
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        displayName: '',
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

        setErrors( (previousForm) => {
            return {
                ...previousForm,
                [name]: undefined,
            }
        })
    }

    const onClickSignup = async () => {
        setPendingApiCall(true);
        setApiError(false);
        const response = await AuthService.signup(form);

        if (response.status === 200 || response.status === 201) {
            setPendingApiCall(false);
            console.log('Usuário cadastrado com sucesso!');
        } else {
            if (response.data.validationErrors) {
                setErrors(response.data.validationErrors);
            }
            setApiError(true);
            setPendingApiCall(false);
        }
    }

    return (
        <main className="form-signup w-100 m-auto">
            <form>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">
                        Novo Usuário - {form.displayName}
                    </h1>
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.displayName ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu nome"
                        name="displayName"
                        id="displayName"
                        onChange={onChange}
                        value={form.displayName}
                    />
                    <label htmlFor="displayName">Informe o seu nome</label>
                    {errors.displayName && (<div className="invalid-feedback">{errors.displayName}</div>)}
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.username ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu usuário"
                        name="username"
                        id="username"
                        onChange={onChange}
                        value={form.username}
                    />
                    <label htmlFor="username">Informe o seu usuário</label>
                    {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className={errors.password ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe a sua senha"
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={form.password}
                    />
                    <label htmlFor="password">Informe a sua senha</label>
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                {apiError && <div className="alert alert-danger">Falha ao autenticar-se!</div>}
                <div className="text-center">
                    <button
                        disabled={pendingApiCall}
                        type="button"
                        className="btn btn-primary"
                        onClick={onClickSignup}>Cadastrar
                    </button>
                </div>
            </form>
        </main>
    )
}