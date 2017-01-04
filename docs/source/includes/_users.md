# Users





## Fetch a list of Users

```javascript
OF.users.fetch(filter)
  .then(users => {
    // do something with users
  });

```

> The above users array is structured like this:

```json
[
  {
    "full_name": "Sol Lewitt",
    "username": "slewitt",
    "created": "2016-02-17T14:12:10.463Z",
    "id": "56c47fba45e503657a51bebd",
    "modified": "2016-02-17T14:12:10.463Z"
  },
  {
    "full_name": "Peter Pan",
    "username": "ppan",
    "created": "2016-02-17T14:12:10.560Z",
    "id": "56c47fba45e503657a51bebc",
    "modified": "2016-02-17T14:12:10.560Z"
  },
  {
    "full_name": "Missy Elliot",
    "username": "melliot",
    "created": "2016-02-17T14:12:10.666Z",
    "id": "56c47fba45e503657a51bebe",
    "modified": "2016-02-17T14:12:10.666Z"
  }
]
```

This endpoint retrieves a list of users. At present, limited information is public for all Openframe users.

### Arguments

Arg | Default | Description
--------- | ------- | -----------
filter | {} | A filter config object





## Fetch a User by ID

```javascript
OF.users.fetchById()
  .then(user => {
    // user is currently authenticated user
  });

OF.users.fetchById("56c47fba45e503657a51bebd")
  .then(user => {
    // do something with user
  });

```

> The above user object is structured like this:

```json
{
  "full_name": "Sol Lewitt",
  "username": "slewitt",
  "created": "2016-02-17T14:12:10.463Z",
  "id": "56c47fba45e503657a51bebd",
  "modified": "2016-02-17T14:12:10.463Z"
}
```

This method retrieves a specific user by ID.

If no ID is passed, it defaults to 'current', which returns the currently authenticated user.

### Arguments

Arg | Default | Description
--------- | ------- | -----------
ID | 'current' | A user ID





## Fetch a User by username

```javascript
OF.users.fetchByUsername("slewitt")
  .then(user => {
    /* user looks like
    {
      "full_name": "Sol Lewitt",
      "username": "slewitt",
      "created": "2016-02-17T14:12:10.463Z",
      "id": "56c47fba45e503657a51bebd",
      "modified": "2016-02-17T14:12:10.463Z"
    }
    */
  });
```

This method retrieves a specific user by Username.

### Arguments

Arg | Default | Description
--------- | ------- | -----------
username | _none_ | A username