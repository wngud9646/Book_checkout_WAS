'use strict'

module.exports = async function (fastify, opts) {
  fastify.patch('/', (req, reply) => {
    fastify.mysql.getConnection(onConnect)
    const body = req.body
    let bodyvalue =''

    for(let i=1; i< Object.values(body).length; i++){
      if(i+1 ==  Object.values(body).length){
          bodyvalue = bodyvalue + Object.keys(body)[i]+ "=\'" + Object.values(body)[i] + "\'"
      }else{
          bodyvalue = bodyvalue + Object.keys(body)[i] + "=\'" + Object.values(body)[i]+ "\',"
      }
  }

    function onConnect (err, client) {
      if (err) return reply.send(err)
      
      client.query(
        'UPDATE Book SET ' + bodyvalue + ' WHERE id=' + Object.values(body)[0],
        function onResult (err) {
          client.release()
          if (err) reply.send(err); // 에러가 발생하면 에러 응답을 반환
          else reply.send("책 정보 수정")
        }
      )
    }
  })
}