import express from 'express'
import Joi from 'joi'
import { create,
  getAll,
  update,
  updateCargo,
  cargosFuncionarios,
  cargosAnterioresFuncionarios,
  // remove,
} from './model'

const router = express.Router()


router.get('/', async (req, res) => {
    // #swagger.tags = ['Funcionário']
    // #swagger.path = '/funcionario'
    // #swagger.description = 'Endpoint para obter todos os cargos funcionarios.'

  try {
    const users = await getAll()
    return res.send(users)
  } catch (error) {
    console.error(error)
  }
})
router.get('/cargos', async (req, res) => {
    // #swagger.tags = ['Funcionário']
    // #swagger.path = '/funcionario/cargos'
    // #swagger.description = 'Endpoint para obter todos cargos anteriores dos funcionarios.'

  try {
    const users = await cargosFuncionarios()
    return res.send(users)
  } catch (error) {
    console.error(error)
  }
})

router.get('/cargos-anteriores', async (req, res) => {
    // #swagger.tags = ['Funcionário']
    // #swagger.path = '/funcionario/cargos-anteriores'
    // #swagger.description = 'Endpoint para obter todos cargos anteriores dos funcionarios.'

  try {
    const users = await cargosAnterioresFuncionarios()
    return res.send(users)
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res) => {
  try {
    // #swagger.tags = ['Funcionário']
    // #swagger.path = '/funcionario'
    // #swagger.description = 'Endpoint para cadastrar um usuário.'

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de Funcionário",
      required: true,
      "schema": {
        "nivelAcesso": "master",
        "nome": "Izauir Guilherme Bernardo dos Santos",
        "sexo": "M",
        "cargo": "Programador",
        "nascimento": "1999-09-18",
        "telefone": "(11)97369-9232",
        "email": "izauirguilherme@hotmail.com",
      }
    } */

    const schema = Joi.object().keys({
      nivelAcesso: Joi.string().required(),
      nome: Joi.string().required(),
      sexo: Joi.string().required(),
      cargo: Joi.string().required(),
      nascimento: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required(),
    })

    const { value, error } = schema.validate(req.body)
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }

    await create(
			value.cargo,
      value.email,
      value.nascimento,
			value.nivelAcesso,
      value.nome,
      value.sexo,
      value.telefone,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', async (req, res) => {
  // #swagger.tags = ['Funcionário']
  // #swagger.path = '/funcionario/{id}'
  // #swagger.description = 'Endpoint para atualizar um Funcionário.'
  /* #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID.',
      required: true,
      type: 'integer'
  } */
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: "Objeto para criação de Funcionário",
    required: true,
    "schema": {
      "nivelAcesso": "master",
      "nome": "Izauir Guilherme Bernardo dos Santos",
      "sexo": "M",
      "cargo": "Programador",
      "nascimento": "1999-09-18",
      "telefone": "(11)97369-9232",
      "email": "izauirguilherme@hotmail.com",
    }
  } */

  try {
    const schemaBody = Joi.object().keys({
      nivelAcesso: Joi.string().required(),
      nome: Joi.string().required(),
      sexo: Joi.string().required(),
      cargo: Joi.string().required(),
      nascimento: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required(),
    })

    const schemaParams = Joi.object().keys({
      id: Joi.number().required()
    })

    const {
      value: bodyValue,
      error: bodyError
    } = schemaBody.validate(req.body)
    
    const {
      value: paramsValue,
      error: paramsError
    } = schemaParams.validate(req.params)

    if (paramsError) { return res.status(400).send({ error: 'Validtaiond error', fields: ['id'] })}
    if (bodyError) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...bodyError.details.map(x => x.path))] }) }

    await update(
      paramsValue.id,
      bodyValue.cargo,
      bodyValue.email,
      bodyValue.nascimento,
      bodyValue.nivelAcesso,
      bodyValue.nome,
      bodyValue.sexo,
      bodyValue.telefone,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.patch('/:id', async (req, res) => {
    // #swagger.tags = ['Funcionário']
    // #swagger.path = '/funcionario/{id}'
    // #swagger.description = 'Endpoint para atualizar um Funcionário.'

    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      format: 'int64'
    } */

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto com o cargo desejado",
      required: true,
      "schema": {
        "cargo": "Streamer",
      }
    } */
  try {
    const schemaBody = Joi.object().keys({
      cargo: Joi.string().required(),
    })

    const schemaParams = Joi.object().keys({
      id: Joi.number().required()
    })

    const {
      value: bodyValue,
      error: bodyError
    } = schemaBody.validate(req.body)
    
    const {
      value: paramsValue,
      error: paramsError
    } = schemaParams.validate(req.params)


    if (paramsError) { return res.status(400).send({ error: 'Validtaiond error', fields: ['id'] })}
    if (bodyError) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...bodyError.details.map(x => x.path))] }) }

    await updateCargo(paramsValue.id, bodyValue.cargo)

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// router.delete('/:id', async (req, res) => {
//     // #swagger.tags = ['Funcionário']
//     // #swagger.path = '/funcionario/{id}'
//     // #swagger.description = 'Endpoint para remover um Funcionário.'
    
//     /* #swagger.parameters['id'] = {
//       in: 'path',
//       required: true,
//       type: 'integer',
//       format: 'int64'
//     } */


//   try {
//     const schema = Joi.object().keys({
//       id: Joi.number().required()
//     })
//     const {
//       value,
//       error
//     } = schema.validate(req.params)

//     if (error) { return res.status(400).send({ error: 'Validtaiond error', fields: ['id'] })}

//     await remove(
//       value.id,
//     )

//     res.send({ status: true })
//   } catch (error) {
//     console.error(error)
//     return res.status(400).send({ error: 'Internal error' })
//   }
// })

export default router
