'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', (req, reply) => {
    fastify.mysql.getConnection(onConnect)
    const getAllBookQuery = `
      SELECT B.id, B.bookname, B.author, B.publisher,
         CASE
             WHEN CH.checked_out = 1 THEN 'Checked_out'
             ELSE 'In_storage'
        END AS checkout_status
      FROM Book B
      LEFT JOIN (
        SELECT Book_id, MAX(id) AS max_id
        FROM checkout_history
        GROUP BY Book_id
      ) LatestCheckouts
      ON B.id = LatestCheckouts.Book_id
      LEFT JOIN checkout_history CH
      ON LatestCheckouts.max_id = CH.id;`

    function onConnect (err, client) {
      if (err) return reply.send(err)
      
      client.query(
        getAllBookQuery,
        function onResult (err, result) {
          client.release()
          if (err) reply.send(err); // 에러가 발생하면 에러 응답을 반환
          else reply.send(result)
        }
      )
    }
  })
}