'use strict';

module.exports = async function (fastify) {
    fastify.post('/', (req, reply) => {
        fastify.mysql.getConnection(onConnect);
        const { bookname, author, publisher } = req.body;

        function onConnect (err, client) {
            if (err) return reply.send(err);
  
            client.query(
                'INSERT INTO Book (bookname, author, publisher) Values (\'' + bookname + '\',\'' + author + '\',\'' + publisher + '\')',
                function onResult (err) {
                    client.release();
                    if (err) reply.send(err); // 에러가 발생하면 에러 응답을 반환
                    else reply.send("책 정보 등록 완료");
                }
            );
        }
    });
};