import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/service/CategoryService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ICategory>();
  const [apiError, setApiError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
        loadData(parseInt(id));
    }
  },[])

  const loadData = async (id: number) => {
    const response = await CategoryService.findById(id);
    if (response.status === 200) {
        reset(response.data);
    } else {
        setApiError(true);
    }
  }

  const onSubmit = async (data: ICategory) => {
    setApiError(false);

    const response = await CategoryService.save(data);
    if (response.status === 201 || response.status === 200) {
      reset();
      navigate("/categories");
    } else {
      setApiError(true);
    }
  };

  return (
    <>
      <main className="container row justify-content-center">
        <form
          className="form-floating col-md-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-3">
            <span className="h3 fw-normal">Cadastro de Categoria</span>
          </div>
          <div className="form-floating mb-3">
            <input
              className={"form-control" + (errors.name ? " is-invalid" : "")}
              placeholder="Informe o nome"
              type="text"
              {...register("name", {
                required: "O campo nome é obrigatório.",
                minLength: {
                  value: 2,
                  message: "O campo nome deve ter no mínimo 2 caracteres.",
                },
                maxLength: {
                  value: 100,
                  message: "O campo nome deve ter no máximo 100 caracteres.",
                },
              })}
            />
            <label htmlFor="name">Nome</label>
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          {apiError && (
            <div className="alert alert-danger" role="alert">
              Erro ao salvar a categoria.
            </div>
          )}

          <button 
                className="w-100 btn btn-lg btn-primary mb-3"
                disabled={isSubmitting ? true : false}
                >Salvar</button>
        </form>
      </main>
    </>
  );
}
