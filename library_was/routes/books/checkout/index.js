'use strict';

module.exports = async function (fastify) {
    fastify.post('/', (req, reply) => {
        const { username, bookid } = req.body;

        // 사용자의 userid 가져오기
        const getUserIdQuery = `
      SELECT id
      FROM User
      WHERE username = ?;
    `;

        const checkoutValidate = `
      SELECT checked_out
      FROM checkout_history
      WHERE Book_id = ?
      ORDER BY id DESC
      LIMIT 1;
    `;

        fastify.mysql.getConnection(function onConnect(err, client) {
            if (err) reply.send(err);

            client.query(checkoutValidate, [bookid], function onValidateResult(err, validateResult) {
                if (err) {
                    client.release();
                    reply.send(err);
                    return;
                }

                if(validateResult.length === 0) console.log("대출기록이 없는 도서");
                else if(validateResult[0].checked_out == 1){
                    client.release();
                    reply.send('Book is already checked out');
                    return;
                }

                client.query(getUserIdQuery, [username], function onUserIdResult(err, userResult) {
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

                    const userId = userResult[0].id;

                    // checkout_history에 항목 삽입
                    const insertCheckoutQuery = `
            INSERT INTO checkout_history (Book_id, User_id, checked_out)
            VALUES (?, ?, 1);
          `;

                    client.query(insertCheckoutQuery, [bookid, userId], function onInsertResult(err) {
                        client.release();
                        if (err) {
                            reply.send(err);
                        } else {
                            reply.send("Checkout history inserted successfully");
                        }
                    });
                });
            });
        });
    });
};
