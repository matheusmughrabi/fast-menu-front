# Fast Menu Front

## Índice

- [Sobre](#sobre)
- [Guia de uso](#guia_uso)
- [Como executar](#como_executar)
- [Próximas features](#proximas_features)
- [Limitações](#limitacoes)

## Sobre<a name = "sobre"></a>
Fast Menu Front disponibiliza ao usuário uma experiência simples de criação e edição de um cardápio de um restaurante.
Para isso, Fast Menu Front comunica-se com Fast Menu API (https://github.com/matheusmughrabi/fast-menu-api/tree/master).

## Guia de uso<a name = "guia_uso"></a>
A seguir segue um resumo de cada funcionalidade do Fast Menu Front e como utilizá-la.

### Obter dados do restaurante
Ao abrir a aplicação o usuário é direcionado para a tela inicial que contém os dados a seguir
- Nome do restaurante
- Seções do cardápio do restaurante
- Itens de cada seção do cardápio
- Botão para criar nova seção
- Botão para editar seção
- Botão para deletar seção
- Botão para adicionar item a uma seção
- Botão para atualizar nome de um item
- Botão para atualizar valor de um item
- Botão para deletar um item

**Endpoint chamado em Fast Menu API:** [GET] restaurante/home?id_restaurante=1

### Criar seção no cardápio
Para criar uma seção no cardápio basta clicar no botão "Adicionar Seção".\
Um modal irá se abrir e você poderá nomear a seção.\
Clique em Salvar para confirmar a criação ou cancelar para descartar.\
**Endpoint chamado em Fast Menu API:** [POST] cardapio-secao/novo

### Editar seção no cardápio
Para editar uma seção do cardápio basta clicar no botão "Editar Seção".\
Um modal irá se abrir e você poderá renomear a seção.\
Clique em Salvar para confirmar a atualização ou cancelar para descartar.\
**Endpoint chamado em Fast Menu API:** [PATCH] cardapio-secao/atualizar-nome

### Deletar seção no cardápio
Para deletar uma seção do cardápio basta clicar no botão "Deletar Seção".\
Um alert irá se abrir.\
Clique em OK para confirmar a deleção ou cancelar para descartar.\
**Endpoint chamado em Fast Menu API:** [DELETE] cardapio-secao/deletar

### Adicionar um item a uma seção do cardápio
Para adicionar um item a uma seção do cardápio clique no botão "Adicionar item".\
Um modal irá se abrir e você poderá informar o nome e valor do item.\
Clique em Salvar para confirmar a criação ou cancelar para descartar.\
**Endpoint chamado em Fast Menu API:** [POST] cardapio-item/novo

### Editar o nome de um item do cardápio
Para editar o nome de um item de uma seção do cardápio clique no botão "Editar nome".\
Um modal irá se abrir e você poderá informar o novo nome do item.\
Clique em Salvar para confirmar a atualização ou cancelar para descartar.\
**Endpoint chamado em Fast Menu API:** [PATCH] cardapio-item/atualizar-nome

### Editar o valor de um item do cardápio
Para editar o valor de um item de uma seção do cardápio clique no botão "Editar valor".\
Um modal irá se abrir e você poderá informar o novo valor do item.\
Clique em Salvar para confirmar a atualização ou cancelar para descartar.\
**Endpoint chamado em Fast Menu API:** [PATCH] cardapio-item/atualizar-valor

### Deletar um item do cardápio
Para deletar um item do cardápio basta clicar no botão deletar item.\
**Endpoint chamado em Fast Menu API:** [DELETE] cardapio-item/deletar

## Como executar<a name = "como_executar"></a>
1. Necessário ter a aplicação Fast Menu Api executando (segue o link com a documentação de como executar a api: https://github.com/matheusmughrabi/fast-menu-api)
2. Abra o arquivo index.html no diretório ./src/index.html

## Próximas features<a name = "proximas_features"></a>
Segue a lista de próximas features que serão implementadas em Fast Menu Front
1. Página de criação de uma nova conta
2. Página de login
3. Página para cadastro de usuários dentro de uma conta
4. Página para o cliente fazer um pedido
    1. Página com o cardápio
    2. Página com o carrinho
    3. Página do valor total da conta
    4. Página para fechar a conta
5. Página de pagamento realizado com sucesso
6. Página para deixar sugestões para o restaurante

## Limitações<a name = "limitacoes"></a>
O projeto Fast Menu Front é apenas um MVP, por isso o conjunto de features implementadas é bastante limitado.
Segue algumas limitações atuais do projeto:
1. Ao abrir a aplicação, uma conta é aberta automaticamente e não temos a possibilidade de criar novas contas (a aplicação é single-tenant).
2. A aplicação não necessita de autenticação atualmente, ao executar o projeto podemos editar o cardápio do restaurante sem estarmos autenticados
3. Não é possível criar novos restaurantes para a conta. No futuro penso que uma conta pode ter vários restaurantes para atender clientes grandes (i.e, Mcdonald's e outras grandes marcas)

