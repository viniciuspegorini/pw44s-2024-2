import { api } from "@/lib/axios";

const CATEGORY_URL = "/categories";

const findAll = async (): Promise<any> => {
  let response;
  try {
    response = await api.get(CATEGORY_URL);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const remove = async (id: number): Promise<any> => {
    let response;
    try {
        response = await api.delete(`${CATEGORY_URL}/${id}`);
    } catch (error: any) {
        response = error.response;
    }
    return response;
}

const CategoryService = {
  findAll,
  remove,
};

export default CategoryService;
