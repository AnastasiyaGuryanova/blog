Таблицы БД:

-   пользователи - users: id | login | password | registed_at | role_id
-   роль пользователя - roles: id | name
-   статья - posts: id | title | image_url | content | published_at
-   комментарии - comments: id | author_id | post_id | content | published_at

Схема для redux store (на клиенте):

-   user: id | login | role_id | session
-   posts: - массив post: id | title | imageUrl | publishedAt | commentsCount
-   post: id | title | | content | publishedAt | comments: массив comment: id | author | content | published_at
-   users: массив user: id | login | registedAt | role
