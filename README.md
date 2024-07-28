Области хранения данных:

-   база данных на JSON
-   BFF посредник сервера-клиента
-   redux store

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), стор (отображдение в браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя), стор (использовать роль пользователя на клиенте)
-   статья: БЛ (список статей), стор (данные о статьях для отображдения)
-   комментарии: БД (список комментариев), стор (отображение в браузере)

Таблицы БД:

-   пользователи - users: id | login | password | registed_at | role_id
-   роль пользователя - roles: id | name
-   статья - posts: id | title | image_url | content | published_at
-   комментарии - comments: id | autor_id | post_id | content | published_at

Схема состояния на BFF:

-   сессия текущего пользователя: login | password | role

Схема для redux store (на клиенте):

-   user: id | login | role_id | session
-   posts: - массив post: id | title | imageUrl | publishedAt | commentsCount
-   post: id | title | | content | publishedAt | comments: массив comment: id | author | content | published_at
-   users: массив user: id | login | registedAt | role
