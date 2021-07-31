const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('./src/server/database/db.js')

const middlewares = jsonServer.defaults({ '--id': '_id' })

server.use(middlewares)
server.use(router)
const PORT = 3000
server.listen(PORT, () => {
  console.log('INFO: ', 'JSON Server is running @ 3000')
})