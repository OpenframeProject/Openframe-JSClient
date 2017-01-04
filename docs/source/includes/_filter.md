# Filtering queries

```javascript
// an example filter for an OF.users.fetch(filter)
let filter = {
  fields: ['username', 'id', 'website'],    // fields to include
  include: 'created_artwork',               // include a relation in the result
  limit: 10,                                // limit the number of results
  skip: 10,                                 // skip a number of results
  order: 'username ASC',                    // result order direction, ASC or DESC
  where: {                                  // filter by field data
    username: {
      like: 'abc'                           // lots of operator options
    }
  },
}
```

All of the `fetch` methods can take an optional `filter` config object, which allows filtering of the query results. Whenever available, it takes the form shown on the right.
