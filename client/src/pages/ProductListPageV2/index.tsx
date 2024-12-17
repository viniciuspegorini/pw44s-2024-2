import { useEffect, useState } from "react";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import { Link, useNavigate } from "react-router-dom";
import {
  BsPencilSquare,
  BsPlusCircle,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export function ProductListPageV2() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<string>("");
  const [apiSuccess, setApiSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setApiError(false);
    setApiMessage("");
    setApiSuccess(false);

    const response = await ProductService.findAll();
    if (response.status === 200) {
      setData(response.data);
    } else {
      setApiError(true);
      setApiMessage("Falha ao carregar os dados");
      setData([]);
    }
  };

  const onClickRemove = async (id?: number) => {
    setApiError(false);
    setApiMessage("");
    setApiSuccess(false);

    if (id) {
      const response = await ProductService.remove(id);
      if (response.status === 204) {
        // loadData();
        setData(data.filter((product) => product.id !== id));
        setApiSuccess(true);
        setApiMessage("Produto removido com sucesso");
      } else {
        setApiError(true);
        setApiMessage("Falha ao remover o produto");
      }
    }
  };

  const onEdit = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <div className="container">
        <h1 className="fs-2 mb-4 text-center">
          Lista de Produtos com Chakra-ui
        </h1>
        <div className="text-center">
          <Link
            to="/products-v2/new"
            className="btn btn-success btn-icon mb-3"
            title="Novo Produto"
            style={{ display: "inline-block" }}
          >
            <BsPlusCircle style={{ display: "inline-block" }} /> Novo Produto
          </Link>
        </div>
        <TableContainer>
          <Table>
            <TableCaption>Lista de Produtos</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Nome</Th>
                <Th isNumeric>Preço</Th>
                <Th>Categoria</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product: IProduct) => (
                <Tr
                  key={product.id}
                  _hover={{ cursor: "pointer", backgroud: "#eee" }}
                >
                  <Td>{product.id}</Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>{product.price}</Td>
                  <Td>{product.category?.name}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Ações"
                        icon={<BsThreeDotsVertical size={20} />}
                        variant={"ghost"}
                      />
                      <MenuList>
                        <MenuItem
                          icon={<BsPencilSquare />}
                          onClick={() => onEdit(`/products-v2/${product.id}`)}
                        >
                          Editar
                        </MenuItem>

                        <MenuItem
                          icon={<BsTrash />}
                          onClick={() => onClickRemove(product.id)}
                        >
                          Remover
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
