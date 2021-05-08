const swaggerJsDoc = require('swagger-jsdoc')
const swaggerDocument = require('./swagger.json')

const swaggerDocs = swaggerJsDoc(swaggerDocument)

module.exports = swaggerDocs