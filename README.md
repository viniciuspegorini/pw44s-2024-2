# Aulas das disciplinas de Programação para Web - PW44S - Turma 4SI (2024-2)

## Back-end

A API REST será desenvolvida utilizando o *framework*  **Spring**.

### Softwares

- JDK 21 ou superior
- IDE:
	- ItelliJ IDEA
	- Spring Tools Suite 4
	- Eclipe for JavaEE ...
- SDBG:
- Postgresql
- Ferramenta para testar a API:
	- Postman
	- Insomnia
- Git
- Docker

## Front-end

O Cliente web desenvolvido utilizando a biblioteca **React**.

### Softwares

- IDE:
	- Visual Studio Code (VSCode)
	- Web Storm
	- Atom...
- Git
- Node.js
- Docker
 

## Projetos de aula:

### Projeto: server 

O conteúdo do projeto é uma API REST com desenvolvida com os *frameworks*  **Spring, Spring Boot, Spring Web e Spring Data**.

### Projeto: client 

O conteúdo do projeto é um cliente web desenvolvido com *framework* React.js, consumindo os recursos da API REST desenvolvida no projeto **server**.

# Avaliação da disciplina:

## Projeto da disciplina - Aplicação de Comércio Eletrônico

Neste projeto, os alunos terão a oportunidade de aplicar seus conhecimentos em desenvolvimento web para criar uma aplicação web de comércio eletrônico. O objetivo é desenvolver uma plataforma de compras online funcional. Os alunos serão desafiados a implementar uma variedade de recursos essenciais para um site de *e-commerce*, incluindo catálogo de produtos, página individual de produtos, carrinho de compras, processamento de pedidos, entre outros. A solução deverá ser dividida entre uma API Rest desenvolvida com o *framework* Spring e um cliente desenvolvido com o *framework* React.

## Datas de entrega:

#### Primeira entrega: 11/11/2024 e 12/11/2024
Na primeira entrega deve estar pronto apenas o lado **servidor** da aplicação, ou seja, a API REST desenvolvida com o *framework* Spring Boot. A apresentação dos *endpoints* da API será via requisições HTTP utilizando o Postman ou Insomnia, juntamente com a defesa do código-fonte desenvolvido.

#### Entrega final: 17/02/2025 e 18/02/2025
Nessa entrega as aplicações cliente e servidor devem ser apresentadas. O servidor pode ter sofrido modificações durante o processo de desenvolvimento do cliente, por isso deve ser apresentado novamente. Os projetos cliente e servidor deverão ser executados e as funcionalidades desenvolvidas deverão ser apresentadas juntamente com a defesa do código-fonte desenvolvido.


## Escopo do projeto
 
O site de comércio eletrônico desenvolvido como projeto final deverá exibir todos os produtos ofertados mesmo que o cliente não esteja autenticado na aplicação. Cada produto também deverá ser exibido em uma página única com os detalhes desse produto, como a descrição, por exemplo. Os produtos devem ser exibidos em páginas para melhor visualização. Os clientes deverão poder filtrar os produtos por categoria.

Os clientes deverão poder adicionar produtos em um carrinho de compras. O carrinho de compras deve possibilitar editar a quantidade de produtos, a remoção de um produto ou a remoção de todos os produtos. O carrinho de compras deve estar disponível mesmo para clientes não autenticados. 

Os clientes que desejarem finalizar uma compra deverão estar cadastrados e autenticados no sistema. Ou seja, ao finalizar compra caso o cliente não esteja autenticado, deverá ser exibida uma página para autenticação. Caso o cliente não esteja cadastrado a página de autenticação deve possuir um link para uma página de cadastro. Após cadastrado e autenticado o cliente poderá finalizar sua compra.

Antes de finalizar a compra, deverá ser exibida uma tela de confirmação de endereço e dos itens comprados. Nessa tela o cliente deverá selecionar o endereço de entrega do pedido caso já tenha o endereço cadastrado. Caso necessário esse cliente poderá cadastrar um novo endereço. O cliente também deverá informar um método de pagamento, e após todos os dados preenchidos poderá finalizar o pedido.

Os clientes deverão poder consultar seu histórico de compras com o detalhe dos produtos comprados.
 
#### Requisitos mínimos:
1. A aplicação deverá conter uma página para listar todos os produtos, utilizar como exemplo os sites de compra disponíveis na internet, a lista de produtos deve conter o nome, valor e a imagem do produto (pode ser uma URL externa).
2. A aplicação deve conter uma página para exibir um produto com detalhes, apresentando o nome, valor, descrição, imagem e botão para adicionar em uma lista de compras.
3. A aplicação deve conter uma página que representa o carrinho de compras, essa tela vai listar os itens adicionados na lista de compras, com a possibilidade de ajustar a quantidade dos itens adicionados e um botão para ir para tela de finalizar compra.
4. Para finalizar a compra é necessário estar autenticado, para isso criar uma tela para cadastro de cliente (usuário) e uma tela para autenticação.
5. Após autenticado exibir a tela com o resumo da compra e um botão para finalizar a compra, nessa etapa os dados devem ser enviados ao servidor e a compra deve ser finalizada.
6. A página de lista de produtos, produto individual e carrinho de compras devem ser exibidas para todos os usuários, mesmo não autenticados.

#### Requisitos extras:
7. Criar uma página para listar os pedidos realizados pelo usuário.
8. Permitir filtrar os produtos por categoria.
9. Criar paginação para a página com a lista de produtos.
10. Permitir o cadastro de mais de um endereço de entrega para o usuário
11. Para auxiliar no preenchimento do cadastro de endereço utilizar algum serviço de consulta a Código de Endereçamento Postal (CEP) do Brasil, por exemplo o ViaCEP. 

#### Observações:
- Não será necessário criar tela para o cadastro de produtos e categorias, esses podem vir diretamente do banco de dados utilizando o arquivo **import.sql**.
- Criar casos de teste na API, os casos devem ser criados a critério do desenvolvedor. Não será necessário cobrir todos os endpoints da API. Sugestão 5 casos de teste.

#### Avaliação final distribuídos por funcionalidade:

|Atividade | Peso |
|--|--|
|Lista de Produtos| 0,75 |
|Página individual de Produto|0,50|
|Carrinho de Compras | 2,25 |
|Cadastro de Usuário, autenticação e autorização | 1,00 |
|Finalizar compra | 2,25 |
|Listar os pedidos realizados | 1,00 |
|Permitir filtrar os produtos por categoria | 0,50 |
|Permitir cadastrar múltiplos endereços | 0,50 |
|Utilizar serviço web de busca de CEP | 0,75 |
|Total | 10.0|

##### Sugestão de entidades:
- Usuário = {id: Long, nome: String, senha: String, email: String}
- Categoria = {id: Long, nome: String}
- Produto = {id: Long, nome: String, descricao: String, preço: BigDecimal, urlImagem: String, categoriaId: Long}
- Pedido = {id: Long, data: DateTime, usuarioId: Long}
- ItensDoPedido = {pedidoId: Long, produtoId: Long, preço: BigDecimal, quantidade: Integer}
- *Enderecos {id: Long, usuarioId: Long, logradouro: String, complemento: String, cep: String...}