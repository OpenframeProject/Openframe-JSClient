# Artwork

## Fetch a list of Artworks

```javascript
OF.artwork.fetch(filter)
  .then(artworks => {
    // do something with artworks
  });

```

> The above artworks array is structured like this:

```json
[
  {
    "title": "unknown-1471551583623.frag",
    "is_public": true,
    "url": "https://thebookofshaders.com/log/160818203933.frag",
    "thumb_url": "https://thebookofshaders.com/log/160818203933.png",
    "author_name": "unknown",
    "required_extensions": {},
    "format": "openframe-glslviewer",
    "id": "57b61d12c0006da8310e9143",
    "ownerId": "57b61cf8c0006da8310e9141",
    "created": "2016-08-18T20:39:46.662Z",
    "modified": "2016-08-18T20:39:46.662Z"
  },
  {
    "title": "Nutrition Facts",
    "is_public": true,
    "url": "http://streetkonect.com/nutritionfacts",
    "thumb_url": "http://streetkonect.com/nutritionfacts/nf4b.jpg",
    "author_name": "Leah Valle",
    "required_extensions": {},
    "format": "openframe-website",
    "id": "57a85d5bc0006da8310e906b",
    "ownerId": "57a85cf2c0006da8310e9069",
    "created": "2016-08-08T10:22:19.405Z",
    "modified": "2016-08-08T10:22:19.405Z"
  }
]
```

This endpoint retrieves a list of Artworks. If called by an unauthenticated user, the list will include only public Artworks. If called by an authenticated user, private Artworks which the user has added will also be present in the response.

## Fetch an Artwork by ID
