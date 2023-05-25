import knex from '../../config/knex'

export const getAll = () => {
  const query = knex('estoque')

  return query
}

export const get = (id) => {
  const query = knex('estoque').where('id', id)
  return query
}

export const create = (
  idProduto,
  quantidade,
) => {
  const query = knex('estoque').insert({
    idProduto,
    quantidade,
  })
  
  return query
}

export const update = (
  id,
  idProduto,
  quantidade,
) => {
  const query = knex('estoque').update({
    idProduto,
    quantidade,
  }).where('id', id)
  
  return query
}

export const remove = (
  id
) => {
  const query = knex('estoque').del().where('id', id)
  return query
}