import express from 'express'
import { getAll } from './model'

const router = express.Router()


router.get('/', async (req, res) => {
    // #swagger.tags = ['Log Funcionario']
    // #swagger.path = '/log-funcionario'
    // #swagger.description = 'Endpoint para obter dados de um usuário.'
 
  try {
    const users = await getAll()
    return res.send(users)
  } catch (error) {
    console.error(error)
  }
})

export default router
