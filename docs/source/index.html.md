---
title: Openframe API Reference

language_tabs:
  - javascript

toc_footers:
  - <a href='https://github.com/OpenframeProject/Openframe-JSClient'>View on Github</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - users
  - frames
  - artwork
  - filter
  - errors

search: true
---

# Introduction

Welcome to the Openframe JavaScript Client! You can use this lib to access Openframe REST API endpoints, which can be used to fetch and update artworks, frames, and profile information for authenticated users.

At present we only have this JavaScript client library, but you're welcome to use any language to interact with the API directly.

All of the methods of the JS client return Promises which are resolved with the parsed response body or are rejected with an error message.

# Initializing the JS Client

```javascript
import OF from 'openframe-jsclient';

// use default openframe server, openframe.io
const OF = new OF();

// to use a different server, pass option to constructor
const OF = new OF({
  api_base: 'http://localhost:8888/api'
});
```

Import the Javascript client class and create a new instance, optionally passing configuration options.

### Configuration Options

Option | Default | Description
--------- | ------- | -----------
api_base | https://api.openframe.io/ | The base URL where the API is located

# Authentication / Authorization

Although some Openframe data is public and can be retrieved via unauthenticated access, the API requires an authenticated user's access token to be supplied with requests in order to manipulate a user's data. An access token can be obtained by hitting the `login` endpoint and providing a valid username (or email) and password.

Once obtained, the access token may be included in requests as a query param:

`GET https://api.openframe.io/v0/user/12345/owned_frames?access_token=wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn`

or in an Authentication header:

`Authentication: wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn`

As noted below, after successful login, the JS client manages storage and inclusion of the header (in browsers with localStorage available).

## Log in

> This assumes you've got an instantiated OF client.

```javascript
OF.users.login({'username': 'test', 'password': 'test'})
  .then(token => {
    console.log(token);
  });

// or

OF.users.login({'email': 'test@test.com', 'password': 'test'})
  .then(token => {
    console.log(token);
  });
```

> If valid credentials are passed, the resolved token object, looks like this, where "id" is the actual access token value:

```json
{
  "id": "wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn",
  "ttl": 1209600,
  "created": "2016-12-05T03:45:55.936Z",
  "userId": "56c47fba45e503657a51bebc"
}
```

On success, the `login` endpoint responds with an access token that is valid for two weeks or until explicity destroyed via logout. The token is presented as the `id` value of response body, and must be supplied with subsequent requests on behalf of the logged in user.

If localStorage is present (i.e. the browser), the JS client automatically saves the access token to localStorage and includes it in subsequent responses.

## Log out

Calling `logout` will destroy the access token on the server and, if present, clear it from localStorage. Successful logout will result in a 204 no content response and resolve the Promise. If there is any problem destroying the access token on the server, the promise will be rejected with an error.

```javascript
OF.users.logout()
  .then(() => {
    // success, no response body
  })
  .catch(error => {
    console.log(error);
  });
```
