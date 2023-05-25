const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = [
  './src/funcionario/routes.js',
  './src/estoque/routes.js',
  './src/logFuncionario/routes.js',
  './src/produto/routes.js',
  './src/venda/routes.js',
]

swaggerAutogen(outputFile, endpointsFiles)