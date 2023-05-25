import express from 'express'
import Joi from 'joi'
import {
  getAll,
  get,
  create,
  update,
  // remove,
} from './model'

const router = express.Router()


router.get('/', async (req, res) => {
    // #swagger.tags = ['Estoque']
    // #swagger.path = '/estoque'
    // #swagger.description = 'Endpoint para obter todos os produtos no estoques da padaria.'

  try {
    const produtosEstoque = await getAll()
    return res.send(produtosEstoque)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Estoque']
    // #swagger.path = '/estoque/{id}'

    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      format: 'int64'
    } */

    // #swagger.description = 'Endpoint trazer apenas um produto por id no Estoque.'
    /* #swagger.requestBody = {
      in: 'params',
      required: true,
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
  
      const estoque = await get(
        value.id,
      )
      res.send(estoque)
    // #swagger.tags = ['Estoque']
    // #swagger.description = 'Endpoint para obter todos os produtos no estoque da padaria.'
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res) => {
  try {
    // #swagger.tags = ['Estoque']
    // #swagger.path = '/estoque'
    // #swagger.description = 'Endpoint para cadastrar um produto no estoque.'

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de Estoque",
      required: true,
      "schema": {
        "idProduto": 1,
        "quantidade": 100
      }
    } */

    const schema = Joi.object().keys({
      idProduto: Joi.number().required(),
      quantidade: Joi.number().required(),
    })

    const { value, error } = schema.validate(req.body)
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }

    await create(
			value.idProduto,
			value.quantidade,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', async (req, res) => {
    // #swagger.tags = ['Estoque']
    // #swagger.path = '/estoque/{id}'
    // #swagger.description = 'Endpoint para atualizar um produto do Estoque.'

    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      format: 'int64'
    } */

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de Estoque",
      required: true,
      "schema": {
        "idProduto": 1,
        "quantidade": 100
      }
    } */

  try {
    const schemaBody = Joi.object().keys({
      idProduto: Joi.number().required(),
      quantidade: Joi.number().required(),
    })

    const schemaParams = Joi.object().keys({
      id: Joi.number().required
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
      bodyValue.quantidade,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// router.delete('/:id', async (req, res) => {
//     // #swagger.tags = ['Estoque']
//     // #swagger.path = '/estoque/{id}'
//     /* #swagger.parameters['id'] = {
//       in: 'path',
//       required: true,
//       type: 'integer',
//       format: 'int64'
//     } */

//     // #swagger.description = 'Endpoint para remover um produto do Estoque.'
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
