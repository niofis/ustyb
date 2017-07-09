# USTYB - Upload Stuff To Your Brain

This software lets you get better at studying and learning. Uses the flashcards method ([guide](https://fluent-forever.com/create-better-flashcards/)) with the [SM2](https://www.supermemo.com/english/ol/sm2.htm) algorithm and a RESTful API to interact with them.

### API

Currently the API is in version 1, so all endpoints are prepended with v1. Methods not described are not allowed.

#### v1/user/id/
API base address, nothing can be done here.

#### v1/user/id/profile
*GET* - Retrieves user profile and user preferences

example:
```javascript
{
  "name": "Someone",
  "email": "someone@everywhere.com",
  "ifttt": <url_to_maker_end_point> //experimental
}
```

*PATCH* - Updates user profile and preferences

#### v1/user/id/decks
*GET* - Retrieves all the user decks and statistics on each one

example:
```javascript
{
  "english": {
    "cards": 5, //Total number of cards
    "due": 1, //Number of cards due to be studied on next session
    "lastStudied": 1483254000, //Unix timestamp
  },
  "spanish": {
    ...
  }
}
```
#### v1/user/id/decks/id

*GET* - Retrieves statistics con the specified deck. Same as the previous endpoint but for a single deck.

*POST* - Creates a new deck with the specified id.

#### v1/user/id/decks/id/cards

*GET* - Retrieves the ids of all the cards in this deck

example:
```javascript
[
  0,
  1,
  2,
  ...
]
```
*POST* - Creates a new flashcard, requires the following data to add it to the database:
```javascript
{
  "front": <string> //Markdown text to show for this flashcard front
  "back": <string> //Markdown for back
}
```

#### v1/user/id/decks/id/cards/due

*GET* - Retrieves the ids of cards due to the next study session

#### v1/user/id/decks/id/cards/due/next

*GET* - Retrieves the id of the top card of the due queue

#### v1/user/id/decks/id/cards/id

*GET* - Retrieve the details for the card.
example:
```javascript
{
  "front": <string> //front
  "back": <string> //back
  "created": <number> //Unix timestamp
  "nextStudy": <number> //Unix timestamp
  "timesStudied": <number>
  "repetition": <number> //SM2 Inter-repetition interval (days)
  "easiness": <number> //SM2 easiness factor, cannot go lower than 1.3
  "quality": <number> //SM2 quality of the recall for the last study session 0 (totally forgot) - 5 (extremely easy to recall)
}
```

*PATCH* - Allows you to update either the front or the back of a card, other stats won't be affected.

#### v1/user/id/decks/id/cards/id/front[.html]

*GET* - Retrieves the front text for the card, using the .html extension will retrieve the hypertext version.

#### v1/user/id/decks/id/cards/id/back[.html]

*GET* - Retrieves the back text for the card, using the .html extension will retrieve the hypertext version.

#### v1/user/id/decks/id/cards/id/quality

*PATCH* - Update the quality of recall for this study session
example:
```javascript
{
  "value": "3" //correct response recalled with serious difficulty (see PM2 algorithm description in link)
}
```
