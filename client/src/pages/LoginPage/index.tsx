import {ChangeEvent, useState} from "react";
import './index.css';
import {IUserLogin} from "@/commons/interfaces.ts";
import {api} from "@/lib/axios.ts";

export function LoginPage () {
    const [form, setForm] = useState<IUserLogin>({
        username: '',
        password: '',
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm( (previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        })
    }

    const onClickLogin = () => {
        console.log(form);

        console.log(1);
        api.post('/login', form)
            .then((response) => {
                console.log(2);
                console.log(response)
            })
            .catch((error) => {
                console.log(3);
                console.log(error)
            }).finally(() => {
            console.log(4);
        });
        console.log(5);
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

                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onClickLogin}>Login
                    </button>
                </div>
            </form>
        </main>
    )
}