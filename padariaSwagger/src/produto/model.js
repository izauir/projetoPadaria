import knex from '../../config/knex'

export const getAll = () => {
  const query = knex('produto')

  return query
}
export const get = (id) => {
  const query = knex('produto').where('id', id).first()

  return query
}
export const produtosEstoque = async () => {
  const query = await knex.raw('SELECT * FROM vw_produtos_estoque;')
  return query[0]
}
export const getMaiorPreco = async() => {
  const query = await knex.raw('SELECT maior_preco_produto();')
  return query[0]
}
export const getMenorPreco = async () => {
  const query = await knex.raw('SELECT menor_preco_produto();')
  console.log(query)
  return query[0]
}
export const getIdNovoProduto = async() => {
  const query = await knex.raw('SELECT id_novo_produto();')
  return query [0]
}


export const create = (
  nome,
  marca,
  precoVenda,
  bitAtivo,
  quantidade
) => {
  const query = knex('produto').insert({
    nome,
    marca,
    precoVenda,
    bitAtivo,
    quantidade
  })
  
  return query
}

export const update = (
  id,
  nome,
  marca,
  precoVenda,
  bitAtivo,
  quantidade
) => {
  const query = knex('produto').update({
    nome,
    marca,
    precoVenda,
    bitAtivo,
    quantidade
  }).where('id', id)
  
  return query
}

export const remove = (
  id
) => {
  const query = knex('produto').del().where('id', id)
  return query
}