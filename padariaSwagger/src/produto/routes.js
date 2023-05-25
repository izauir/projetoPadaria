import express from 'express'
import Joi from 'joi'
import {
  getAll,
  get,
  getMaiorPreco,
  getMenorPreco,
  produtosEstoque,
  getIdNovoProduto,
  create,
  update,
  // remove,
} from './model'

const router = express.Router()


router.get('/', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto'
    // #swagger.description = 'Endpoint para obter todos os produtos da padaria.'

  try {
    const users = await getAll()
    return res.send(users)
  } catch (error) {
    console.error(error)
  }
})

router.get('/estoque', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto/estoque'
    // #swagger.description = 'Endpoint para obter o produto com o maior preço da padaria.'

  try {
    const produto = await produtosEstoque()
    return res.send(produto)
  } catch (error) {
    console.error(error)
  }
})
router.get('/menor-preco', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto/menor-preco'
    // #swagger.description = 'Endpoint para obter o produto com o maior preço da padaria.'

  try {
    const produto = await getMenorPreco()
    return res.send(produto)
  } catch (error) {
    console.error(error)
  }
})

router.get('/maior-preco', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto/maior-preco'
    // #swagger.description = 'Endpoint para obter o produto com o maior preço da padaria.'

  try {
    const produto = await getMaiorPreco()
    return res.send(produto)
  } catch (error) {
    console.error(error)
  }
})

router.get('/id-novo-produto', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto/id-novo-produto'
    // #swagger.description = 'Endpoint para obter o produto com o maior preço da padaria.'

  try {
    const produto = await getIdNovoProduto()
    return res.send(produto)
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto/{id}'
    // #swagger.description = 'Endpoint para remover um Produto.'

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
  
      const produto = await get(
        value.id,
      )
    // #swagger.tags = ['Produto']
    // #swagger.description = 'Endpoint para obter todos os produtos da padaria.'
    res.send(produto)
  } catch (error) {
    console.error(error)
  }
})

router.post('/', async (req, res) => {
  try {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto'
    // #swagger.description = 'Endpoint para cadastrar um usuário.'

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de Produto",
      required: true,
      "schema": {
        "nome": "Coca-cola Lata 350 ml.",
        "marca": "Coca",
        "precoVenda": 2.80,
        "bitAtivo": 1,
        "quantidade": 1
      }
    } */

    const schema = Joi.object().keys({
      nome: Joi.string().required(),
      marca: Joi.string().required(),
      precoVenda: Joi.number().required(),
      bitAtivo: Joi.number().required(),
      quantidade: Joi.number().required(),
    })

    const { value, error } = schema.validate(req.body)
    if (error) { return res.status(400).send({ error: 'Validation error', fields: [...new Set(...error.details.map(x => x.path))] }) }

    await create(
			value.nome,
			value.marca,
      value.precoVenda,
      value.bitAtivo,
      value.quantidade,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

router.put('/:id', async (req, res) => {
    // #swagger.tags = ['Produto']
    // #swagger.path = '/produto/{id}'
    // #swagger.description = 'Endpoint para atualizar um Produto.'

    /* #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      format: 'int64'
    } */

    /* #swagger.parameters['body'] = {
      in: 'body',
      description: "Objeto para criação de Produto",
      required: true,
      "schema": {
        "nome": "Coca-cola Lata 350 ml.",
        "marca": "Coca",
        "precoVenda": 2.80,
        "bitAtivo": 1,
        "quantidade": 1
      }
    } */

  try {
    const schemaBody = Joi.object().keys({
      nome: Joi.string().required(),
      marca: Joi.string().required(),
      precoVenda: Joi.number().required(),
      bitAtivo: Joi.number().required(),
      quantidade: Joi.number().required(),
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
			bodyValue.nome,
			bodyValue.marca,
      bodyValue.precoVenda,
      bodyValue.bitAtivo,
      bodyValue.quantidade,
    )

    res.send({ status: true })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: 'Internal error' })
  }
})

// router.delete('/:id', async (req, res) => {
//     // #swagger.tags = ['Produto']
//     // #swagger.path = '/produto/{id}'
//     // #swagger.description = 'Endpoint para remover um Produto.'
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
