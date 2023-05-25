import express from 'express'
import Joi from 'joi'
import {
  getAll,
  get,
  create,
  update,
  historicoVendas
  // remove,
} from './model'

const router = express.Router()


router.get('/', async (req, res) => {
    // #swagger.tags = ['Venda']
    // #swagger.path = '/venda'
    // #swagger.description = 'Endpoint para obter todos os vendas da padaria.'

  try {
    const vendas = await getAll()
    return res.send(vendas)
  } catch (error) {
    console.error(error)
  }
})

router.get('/historico', async (req, res) => {
    // #swagger.tags = ['Venda']
    // #swagger.path = '/venda/historico'
    // #swagger.description = 'Endpoint para obter todos os vendas da padaria.'

  try {
    const historico = await historicoVendas()
    return res.send(historico)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Venda']
    // #swagger.path = '/venda/{id}'
    // #swagger.description = 'Endpoint para remover um venda.'

    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      format: 'int64'
    } */


    try {
      const schema = Joi.object().keys({
        id: Joi.number().required()
      })
      const {
        value,
        error
      } = schema.validate(req.params)
  
      if (error) { return res.status(400).send({ error: 'Validtaiond error', fields: ['id'] })}
  
      const venda = await get(
        value.id,
      )
    res.send(venda)
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res) => {
  try {
    // #swagger.tags = ['Venda']
    // #swagger.path = '/venda'
    // #swagger.description = 'Endpoint para cadastrar um usuário.'

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de venda",
      required: true,
      "schema": {
        "idProduto": 1,
        "valor": 3.50,
        "quantidade": 2,
        "data": "2022-12-05",
      }
    } */

    const schema = Joi.object().keys({
      idProduto: Joi.number().required(),
      valor: Joi.number().required(),
      quantidade: Joi.number().required(),
      data: Joi.date().required(),
    })

    const { value, error } = schema.validate(req.body)
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }

    await create(
			value.idProduto,
			value.valor,
      value.quantidade,
      value.data,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', async (req, res) => {
    // #swagger.tags = ['Venda']
    // #swagger.path = '/venda/{id}'
    // #swagger.description = 'Endpoint para atualizar um venda.'

    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      format: 'int64'
    } */

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de venda",
      required: true,
      "schema": {
        "idProduto": 1,
        "valor": 3.50,
        "quantidade": 2,
        "data": "2022-12-05",
      }
    } */

  try {
    const schemaBody = Joi.object().keys({
      idProduto: Joi.string().required(),
      valor: Joi.string().required(),
      quantidade: Joi.number().required(),
      data: Joi.number().required(),
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
			bodyValue.idProduto,
			bodyValue.valor,
      bodyValue.quantidade,
      bodyValue.data,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// router.delete('/:id', async (req, res) => {
//     // #swagger.tags = ['Venda']
//     // #swagger.path = '/venda/{id}'
//     // #swagger.description = 'Endpoint para remover um venda.'
//     /* #swagger.requestBody = {
//       in: 'params',
//       required: true,
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
