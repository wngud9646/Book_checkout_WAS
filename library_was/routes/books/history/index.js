'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', (req, reply) => {
    fastify.mysql.getConnection(onConnect)
    const getAllHistoryQuery = `
      SELECT CH.id, U.username, B.bookname, 
       CASE 
           WHEN CH.checked_out = 1 THEN 'Checked_out'
           WHEN CH.checked_out = 0 THEN 'Return'
       END AS checkout_status
      FROM checkout_history CH
      JOIN User U ON CH.User_id = U.id
      JOIN Book B ON CH.Book_id = B.id
      ORDER BY id ASC;
    `

    function onConnect (err, client) {
      if (err) return reply.send(err)
  
      client.query(
        getAllHistoryQuery,
        function onResult (err, result) {
          client.release()
          reply.send(err || result)
        }
      )
    }
  })

  fastify.get('/:id', (req, reply) => { 
    fastify.mysql.getConnection(onConnect)
    const getHistoryByIdQuerys = `
      SELECT CH.id, U.username, B.bookname, 
       CASE 
           WHEN CH.checked_out = 1 THEN 'Checked_out'
           WHEN CH.checked_out = 0 THEN 'Return'
       END AS checkout_status
      FROM checkout_history CH
      JOIN User U ON CH.User_id = U.id
      JOIN Book B ON CH.Book_id = B.id
      WHERE B.id=` + req.params.id + `
      ORDER BY id ASC;
    `

    function onConnect (err, client) {
      if (err) return reply.send(err)
  
      client.query(
        getHistoryByIdQuerys,
        function onResult (err, result) {
          client.release()
          if (err) reply.send(err); // 에러가 발생하면 에러 응답을 반환
          else reply.send(result)
        }
      )
    }
  })
}