## API 명세
| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| POST | /users/register | Content-Type: application/json | username, password | 200 | "회원가입 완료" |
| GET | / | - | - | 200 | "도서 대출 관리 WAS" |
| GET | /books | - | - | 200 | list-of-books |
| GET | /books/{id} | - | - | 200 | list-of-book |
| GET | /books/history | - | - | 200 | list-of-history |
| POST | /books/register | Content-Type: application/json | bookname, author, publisher | 200 | "책 정보 등록 완료" |
| PATCH | /books/modify | Content-Type: application/json | list-of-book(optional) | 201, 401, 404 | list-of-course, {"result":"authorization failed"}, {"not a instructor"} |
| POST | /books/checkout | Content-Type: application/json | bookname, username | 200 | "Checkout history inserted successfully" ,"Book is already checked out", "user not found" |
| POST | /books/return | Content-Type: application/json | - | 200 | "Return history inserted successfully", "user not found" |


---
list of book
```
[
    {
        "id": 1,
        "bookname": "책1",
        "author": "저자1",
        "publisher": "출판사1",
        "checkout_status": "Checked_out"
    }
]
```

list of history
```
[
    {
        "id": 1,
        "username": "lee",
        "bookname": "책1",
        "checkout_status": "Checked_out"
    }
]   
```


### API 상세

**(C)**

| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| POST | /users/register | Content-Type: application/json | username, password | 200 | "회원가입 완료" |

**⇒  새로운 유저는 회원가입할 수 있다.**


| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| POST | /books/register | Content-Type: application/json | bookname, author, publisher | 200 | "책 정보 등록 완료" |

**⇒  사용자는 새로운 책을 등록할 수 있다.**

| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| POST | /books/checkout | Content-Type: application/json | bookname, username | 200 | "Checkout history inserted successfully" ,"Book is already checked out", "user not found" |

**⇒  유저는 책을 대여할 수 있으며, 이는 대여이력에 기록된다.**


| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| POST | /books/return | Content-Type: application/json | - | 200 | "Return history inserted successfully", "user not found" |

**⇒  유저는 책을 반납할 수 있으며, 이는 대여이력에 기록된다.**


**(R)**

| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| GET | / | - | - | 200 | "도서 대출 관리 WAS" |

**⇒  WAS 초기 루트 화면.**

| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| GET | /books | - | - | 200 | list-of-books |

**⇒  유저는 책의 정보를 조회할 수 있다.**

| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| GET | /books/{id} | - | - | 200 | list-of-book |

**⇒  유저는 특정 책의 정보를 조회할 수 있다.**


| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| GET | /books/history | - | - | 200 | list-of-history |

**⇒  유저는 대여이력의 정보를 조회할 수 있다.**


**(U)**

| Method | Path | Request Header | Request Body | Response Status Code | Response Body |
| --- | --- | --- | --- | --- | --- |
| PATCH | /books/modify | Content-Type: application/json | list-of-book(optional) | 201, 401, 404 | list-of-course, {"result":"authorization failed"}, {"not a instructor"} |

**⇒  유저는 책의 정보를 수정할 수 있다.**