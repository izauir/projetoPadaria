import knex from '../../config/knex'
// Get logs
export const getAll = () => {
  const query = knex('funcionario')

  return query
}

export const cargosFuncionarios = () => {
  const query = knex.raw('SELECT * FROM vw_cargos_funcionarios')

  return query
}

export const poderFuncionarios = () => {
  const query = knex.raw('SELECT * FROM vw_poder_funcionarios')

  return query
}

export const cargosAnterioresFuncionarios = () => {
  const query = knex.raw('SELECT * FROM vw_cargos_anteriores_funcionarios')

  return query
}
export const get = (id) => {
  const query = knex('funcionario')
    .where('id', id)

  return query
}

export const create = (
  cargo,
  email,
  nascimento,
  nivelAcesso,
  nome,
  sexo,
  telefone,
) => {
  return knex('funcionario').insert({
    cargo,
    email,
    nascimento,
    nivelAcesso,
    nome,
    sexo,
    telefone,
  })
}

export const update = (
  id,
  cargo,
  email,
  nascimento,
  nivelAcesso,
  nome,
  sexo,
  telefone
) => {
  return knex('funcionario').update({
    cargo,
    email,
    nascimento,
    nivelAcesso,
    nome,
    sexo,
    telefone
  }).where('id', id)
}

export const updateCargo = (id, Cargo) => {
  return knex('funcionario').update({ Cargo }).where('id', id)
}

export const remove = (id) => {
  return knex('funcionario').del().where('id', id)
}