const url_api = 'http://127.0.0.1:5000';

document.addEventListener("DOMContentLoaded", function() {
    fetch(`${url_api}/restaurante/home?id_restaurante=1`)
        .then(response => response.json())
        .then(data => {
            renderizarCardapio(data);
            criarEventos();
        });
});

function renderizarCardapio(data) {
    const nomeRestaurante = document.getElementById('nomeRestaurante');
    nomeRestaurante.innerText = data.nome_restaurante;

    const secoesContainer = document.getElementById('secoesContainer');
    const hiddenCardapioId = document.getElementById('hiddenCardapioId');
    
    hiddenCardapioId.value = data.cardapio.id_cardapio;

    data.cardapio.cardapio_secoes.forEach(secao => {
        const secaoElement = document.createElement('div');

        secaoElement.innerHTML = `
        <h2>${secao.nome}</h2>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Valor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${secao.itens.map(item => `
                <tr>
                    <td>${item.nome}</td>
                    <td>R$ ${item.valor}</td>
                    <td>
                        <button data-item-id="${item.id_item}" data-item-name="${item.nome}" class="btn btn-secondary btn-sm btn-edit-name">Editar Nome</button>
                        <button data-item-id="${item.id_item}" data-item-value="${item.valor}" class="btn btn-secondary btn-sm btn-edit-value">Editar Valor</button>
                        <button data-item-id="${item.id_item}" class="btn btn-danger btn-sm delete-item-btn">Deletar Item</button>
                    </td>
                </tr>`).join('')}
            </tbody>
        </table>
        <button class="btn btn-primary btn-sm mb-3 btn-add-item" data-secao-id="${secao.id_cardapio_secao}">Adicionar Item</button>
        <button data-secao-id="${secao.id_cardapio_secao}" data-secao-name="${secao.nome}" class="btn btn-secondary btn-sm mb-3 btn-edit-secao">Editar Seção</button>
        <button data-secao-id="${secao.id_cardapio_secao}" class="btn btn-danger btn-sm mb-3 btn-delete-secao">Deletar Seção</button>
        <hr>
        `;

        secoesContainer.appendChild(secaoElement);
    });

    const btnElement = document.createElement('div');
    btnElement.innerHTML = `<button data-cardapio-id="${data.cardapio.id_cardapio}" class="btn btn-primary btn-add-secao">Adicionar Seção</button>`;
    secoesContainer.appendChild(btnElement);
}

function criarEventos(){
    criarEventoAdicionarItemBotao();
    criarEventoAdicionarItemModal();
    criarEventoDeletarItemBotao();
    criarEventoEditarNomeItemBotao();
    criarEventoEditarNomeModal();
    criarEventoEditarValorItemBotao();
    criarEventoEditarValorItemModal();
    criarEventoAdicionarSecaoBotao();
    criarEventoAdicionarSecaoModal();
    criarEventoEditarSecaoBotao();
    criarEventoEditarSecaoModal();
    criarEventoDeletarSecao();
}

function criarEventoAdicionarItemBotao(){
    $('.btn-add-item').on('click', function() {
        const secaoId = $(this).data('secao-id');
    
        $('#hiddenSecaoId').val(secaoId);
    
        $('#adicionarCardapioItem').modal('show');
    });
}


function criarEventoAdicionarItemModal(){
    $('#adicionarCardapioItem form').on('submit', function(event) {
        event.preventDefault();

        const nome = $('#nomeItem').val();
        const valor = parseFloat($('#valorItem').val());
        const id_cardapio_secao = parseInt($('#hiddenSecaoId').val());

        let formData = new FormData();
        formData.append('nome', nome);
        formData.append('valor', valor);
        formData.append('id_cardapio_secao', id_cardapio_secao);

        $.ajax({
            url: `${url_api}/cardapio-item/novo`,
            type: 'POST',
            data: formData,
            contentType: false, 
            processData: false, 
            success: function (data) {
                if(data.detail) {
                    alert(data.detail); 
                } else {
                    location.reload();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            }
        });
    });
}

function criarEventoDeletarItemBotao(){
    $(".delete-item-btn").click(function () {
        const itemId = $(this).data('item-id');

        let formData = new FormData();
        formData.append('id_cardapio_item', itemId);

        $.ajax({
            url: `${url_api}/cardapio-item/deletar`,
            type: 'DELETE',
            data: formData,
            contentType: false,
            processData: false,
            success: function (result) {
                if (result.message) {
                    alert('Item deletado com sucesso!');
                    location.reload();
                } else {
                    alert(jqXHR.responseJSON.message);
                }
            }
        });
    });
}

function criarEventoEditarNomeItemBotao(){
    $(".btn-edit-name").click(function () {
        const itemId = $(this).data('item-id');
        const itemName = $(this).data('item-name');
        $("#item_id_edit").val(itemId);
        $("#item_nome_edit").val(itemName);
        $("#editNameModal").modal('show');
    });
}

function criarEventoEditarNomeModal(){
    $('#editNameModal form').on('submit', function(event) {
        event.preventDefault(); 

        const nome = $('#item_nome_edit').val();
        const idItem = parseInt($('#item_id_edit').val());

        let formData = new FormData();
        formData.append('nome', nome);
        formData.append('id', idItem);

        $.ajax({
            url: `${url_api}/cardapio-item/atualizar-nome`,
            type: 'PATCH',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.detail) {
                    alert(data.detail);
                } else {
                    location.reload();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            }
        });
    });
}

function criarEventoEditarValorItemBotao(){
    $(".btn-edit-value").click(function () {
        const itemId = $(this).data('item-id');
        const itemValue = $(this).data('item-value');
        $("#item_id_edit_valor").val(itemId);
        $("#item_valor_edit").val(itemValue);
        $("#editValueModal").modal('show');
    });
}

function criarEventoEditarValorItemModal(){
    $('#editValueModal form').on('submit', function(event) {
        event.preventDefault();

        const valor = $('#item_valor_edit').val();
        const idItem = parseInt($('#item_id_edit_valor').val());

        let formData = new FormData();
        formData.append('valor', valor);
        formData.append('id', idItem);

        $.ajax({
            url: `${url_api}/cardapio-item/atualizar-valor`,
            type: 'PATCH',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.detail) {
                    alert(data.detail);
                } else {
                    location.reload();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            }
        });
    });
}

function criarEventoAdicionarSecaoBotao(){
    $(".btn-add-secao").click(function () {
        var cardapioId = $(this).data("cardapio-id");
    
        $("#inputCardapioId").val(cardapioId);
    
        $("#addSecaoModal").modal('show');
    });
}

function criarEventoAdicionarSecaoModal(){
    $('#addSecaoModal form').on('submit', function(event) {
        event.preventDefault();

        const idCardapio = parseInt($('#inputCardapioId').val());
        const nome = $('#secaoName').val();

        let formData = new FormData();
        formData.append('id_cardapio', idCardapio);
        formData.append('nome', nome);

        $.ajax({
            url: `${url_api}/cardapio-secao/novo`,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false, 
            success: function (data) {
                if(data.detail) {
                    alert(data.detail); 
                } else {
                    location.reload();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            }
        });
    });
}

function criarEventoEditarSecaoBotao(){
    $(".btn-edit-secao").click(function () {
        var secaoId = $(this).data("secao-id");
        var secaoName = $(this).data("secao-name");
    
        $("#editSecaoName").val(secaoName);
        $("#editSecaoId").val(secaoId);
    
        $("#editSecaoModal").modal('show');
    });
}

function criarEventoEditarSecaoModal(){
    $('#editSecaoModal form').on('submit', function(event) {
        event.preventDefault(); 

        const idSecao = parseInt($('#editSecaoId').val());
        const nome = $('#editSecaoName').val();

        let formData = new FormData();
        formData.append('id_secao', idSecao);
        formData.append('nome', nome);

        $.ajax({
            url: `${url_api}/cardapio-secao/atualizar-nome`,
            type: 'PATCH',
            data: formData,
            contentType: false, 
            processData: false,
            success: function (data) {
                if(data.detail) {
                    alert(data.detail);
                } else {
                    location.reload(); 
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseJSON.message);
            }
        });
    });
}

function criarEventoDeletarSecao(){
    $(".btn-delete-secao").click(function () {
        var secaoId = $(this).data("secao-id");
    
        var userConfirmed = confirm("Tem certeza que deseja deletar essa seção?");
    
        if (userConfirmed) {

            let formData = new FormData();
            formData.append('id_secao', secaoId);

            $.ajax({
                url: `${url_api}/cardapio-secao/deletar`,
                type: 'DELETE',
                data: formData,
                contentType: false, 
                processData: false,
                success: function (data) {
                    if(data.detail) {
                        alert(data.detail); 
                    } else {
                        location.reload();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseJSON.message);
                }
            });
        }
    });
}

