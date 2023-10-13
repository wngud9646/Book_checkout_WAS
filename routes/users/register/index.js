'use strict'

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (req, reply) {


      return "회원가입 웹페이지";
    })
  
  fastify.post('/', (req, reply) => {
    fastify.mysql.getConnection(onConnect)
    const { username, password } = req.body;

    function onConnect (err, client) {
      if (err) return reply.send(err)
  
      client.query(
        'INSERT INTO User (username, password) Values (\'' + username + '\',\'' + password + '\')',
        function onResult (err) {
          client.release()
          reply.send(err || "회원가입 완료")
        }
      )
    }
  })
}
