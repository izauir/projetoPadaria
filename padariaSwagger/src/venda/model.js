import knex from '../../config/knex'

export const getAll = () => {
  const query = knex('venda')

  return query
}

export const get = (id) => {
  console.log(id)
  const query = knex('venda').where('id', id).first()
  return query
}

export const create = (
  idProduto,
  valor,
  quantidade,
  data,
) => {
  const query = knex('venda').insert({
    idProduto,
    valor,
    quantidade,
    data,
  })
  
  return query
}

export const historicoVendas = () => {
  const query = knex.raw('SELECT * FROM vw_historico_vendas')

  return query
}

export const update = (
  id,
  idProduto,
  valor,
  quantidade,
  data,
) => {
  const query = knex('venda').update({
    idProduto,
    valor,
    quantidade,
    data,
  }).where('id', id)
  
  return query
}

export const remove = (
  id
) => {
  const query = knex('venda').del().where('id', id)
  return query
}