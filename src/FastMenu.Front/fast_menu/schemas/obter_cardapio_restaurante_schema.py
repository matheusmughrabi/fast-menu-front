from typing import List

class Item:
    def __init__(self, id_item: int, nome: str, valor: float):
        self.id_item = id_item
        self.nome = nome
        self.valor = valor

class CardapioSecao:
    def __init__(self, id_cardapio_secao: int, nome: str, itens: List[Item]):
        self.id_cardapio_secao = id_cardapio_secao
        self.nome = nome
        self.itens = itens
        
class Cardapio():
    def __init__(self, id_cardapio: int):
        self.id_cardapio = id_cardapio
        
class ObterCardapioRestauranteViewSchema:
    def __init__(self, id_restaurante: int, nome_restaurante: str, cardapio: Cardapio, cardapio_secoes: List[CardapioSecao]):
        self.id_restaurante = id_restaurante
        self.nome_restaurante = nome_restaurante
        self.cardapio = cardapio
        self.cardapio_secoes = cardapio_secoes
