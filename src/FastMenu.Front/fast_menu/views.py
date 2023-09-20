"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import jsonify, redirect, render_template, request, url_for
from fast_menu import app
from fast_menu.schemas.obter_cardapio_restaurante_schema import Cardapio, CardapioSecao, Item, ObterCardapioRestauranteViewSchema
import requests

def format_currency(value):
    return "R$ {:,.2f}".format(value)

app.add_template_filter(format_currency, 'currency')

url_api = 'http://localhost:59160'

@app.route('/')
@app.route('/home')
def home():
    # Faça uma solicitação GET à API para obter os detalhes do cardápio
    response = requests.get(url_api + '/restaurante/home?id_restaurante=1')

    # Verifica se a resposta foi bem-sucedida
    if response.status_code == 200:
        data = response.json()  # Converte a resposta em um dicionário

        # Constrói o objeto cardapio com base na resposta da API
        cardapio_secoes = [
            CardapioSecao(
                id_cardapio_secao=secao['id_cardapio_secao'],
                nome=secao['nome'],
                itens=[
                    Item(id_item=item['id_item'], nome=item['nome'], valor=item['valor'])
                    for item in secao['itens']
                ]
            )
            for secao in data['cardapio_secoes']
        ]

        cardapio = ObterCardapioRestauranteViewSchema(
            id_restaurante=data['id_restaurante'],
            nome_restaurante=data['nome_restaurante'],
            cardapio=Cardapio(id_cardapio=data['cardapio']['id_cardapio']),
            cardapio_secoes=cardapio_secoes
        )

        return render_template('index.html', cardapio=cardapio)

    else:
        # Caso a resposta não seja bem-sucedida, retorna uma mensagem de erro
        return "Erro ao obter os dados do cardápio", 500

@app.route('/delete-item/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    # Cria o corpo da requisição como form-data
    data = {
        'id_cardapio_item': item_id
    }

    # Envia a requisição DELETE
    response = requests.delete(url_api + '/cardapio-item/deletar', data=data)

    if response.status_code == 200:
        return jsonify(success=True)
    else:
        return jsonify(success=False), 500
    
@app.route('/editar-nome', methods=['POST'])
def editar_nome():
    item_id = request.form.get('item_id')
    item_nome = request.form.get('item_nome')

    data = {
        'id': item_id,
        'nome': item_nome
    }

    response = requests.patch(url_api + '/cardapio-item/atualizar-nome', data=data)

    if response.status_code == 200:
        return redirect(url_for('home'))
    else:
        return "Erro ao editar nome do item", 500

@app.route('/editar-valor', methods=['POST'])
def editar_valor():
    item_id = request.form.get('item_id_valor')
    item_valor = request.form.get('item_valor')

    data = {
        'id': item_id,
        'valor': float(item_valor)
    }

    response = requests.patch(url_api + '/cardapio-item/atualizar-valor', data=data)

    if response.status_code == 200:
        return redirect(url_for('home'))
    else:
        return "Erro ao editar valor do item", 500
    
@app.route('/adicionar-item', methods=['POST'])
def adicionar_item():
    item_name = request.form.get('item_name')
    item_value = request.form.get('item_value')
    item_secao_id = request.form.get('item_secao_id')

    data = {
        'nome': item_name,
        'valor': float(item_value),
        'id_cardapio_secao': int(item_secao_id)
    }

    response = requests.post(url_api + '/cardapio-item/novo', data=data)

    if response.status_code == 201:
        return redirect(url_for('home'))
    else:
        return "Erro ao adicionar novo item", 500
    
@app.route('/adicionar-secao', methods=['POST'])
def adicionar_secao():
    # Obtenha os dados do formulário
    nome_secao = request.form['nome']
    id_cardapio = request.form['id_cardapio']

    # Defina os dados para enviar à API
    payload = {
        'nome': nome_secao,
        'id_cardapio': id_cardapio
    }

    # Faça uma requisição POST à API
    response = requests.post(url_api + '/menu-secao/novo', data=payload)

    # Verifique a resposta da API
    if response.status_code == 201:
        return redirect(url_for('home'))
    else:
        return "Erro ao criar seção", 500
    

@app.route('/editar-secao', methods=['POST'])
def editar_secao():
    id_secao = request.form.get('id_secao')
    nome = request.form.get('nome')

    payload = {
        "id_secao": id_secao,
        "nome": nome
    }

    response = requests.put(url_api + '/menu-secao/atualizar-nome', data=payload)

    if response.status_code == 200:
        return redirect(url_for('home'))
    else:
        return "Erro ao editar a seção", 500
    

@app.route('/deletar-secao', methods=['POST'])
def deletar_secao():
    id_secao = request.form.get('id_secao')
    
    payload = {
        "id_secao": int(id_secao)
    }

    response = requests.delete(url_api + '/menu-secao/deletar', data=payload)

    if response.status_code == 200:
        return jsonify(success=True)
    else:
        return "Erro ao deletar a seção", 500