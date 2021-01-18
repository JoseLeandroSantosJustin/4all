# 4all Rental Store
## Endpoints
### /users
- GET **/users**
  - Description: Return all users
  - Responses:
    - 200: Users found
    - 204: No registered users
    - 500: System error

- POST **/users**
  - Description: Create a new user
  - Body:
    - email: string *required*
    - password: string *required*
    - name: string *required*
  - Responses:
    - 201: Created user
    - 204: No registered users
    - 400: Request problems
    - 500: System error

### /login
- POST **/login/logon**
  - Description: Creates an access token
  - Body:
    - email: string *required*
    - password: string *required*
  - Responses:
    - 200: Created token
    - 400: Request problems
    - 500: System error

- POST **/login/logout/:id**
  - Description: Disables a token
  - Body:
    - token: string *required*
  - Responses:
    - 200: Token disabled
    - 400: Request problems
    - 500: System error

### /rental-store
- GET **/rental-store/:id/movies**
  - Description: Return movies from a rental store
  - Header:
    - Authorization:**(access token)** string *required*
  - Query
    - isRented: boolean *optional*
    - title: string *optional*
  - Responses:
    - 200: Movies found
    - 204: No available movies
    - 400: Request problems
    - 401: Unauthorized token
    - 500: System error

- POST **/rental-store/:idRentalStore/media/:idMedia**
  - Description: Changes media state
  - Header:
    - Authorization:**(access token)** string *required*
  - Body
    - isRented: boolean *required*
  - Responses:
    - 200: Updated media state
    - 400: Request problems
    - 401: Unauthorized token
    - 500: System error
