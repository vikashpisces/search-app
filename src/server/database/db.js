const users = require('./users')
const tickets = require('./tickets')
const organizations = require('./organizations')

module.exports = () => ({
  users,
  tickets,
  organizations
})