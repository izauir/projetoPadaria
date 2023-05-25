import knex from '../../config/knex'

export const getAll = () => {
  const query = knex('logFuncionario')

  return query
}

