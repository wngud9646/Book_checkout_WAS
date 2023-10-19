'use strict';

module.exports = async function (fastify) {
    fastify.post('/', (req, reply) => {
        const { bookid } = req.body;

        // 사용자의 userid 가져오기
        const getUserIdQuery = `
      SELECT User_id
      FROM checkout_history
      WHERE Book_id = ?
      ORDER BY id DESC
      LIMIT 1;
    `;


        fastify.mysql.getConnection(function onConnect(err, client) {
            if (err) reply.send(err);

            client.query(getUserIdQuery, [bookid], function onUserIdResult(err, userResult) {
                if (err) {
                    client.release();
                    reply.send(err);
                    return;
                }         

                if (userResult.length === 0) {
                    client.release();
                    reply.send("User not found");
                    return;
                }

                const userid = userResult[0].User_id;

                // checkout_history에 항목 삽입
                const insertReturnQuery = `
          INSERT INTO checkout_history (Book_id, User_id, checked_out)
          VALUES (?, ?, 0);
        `;

                client.query(insertReturnQuery, [bookid, userid], function onInsertResult(err) {
                    client.release();
                    if (err) {
                        reply.send(err);
                    } else {
                        reply.send("Return history inserted successfully");
                    }
                });
            });
        });
    });
};

