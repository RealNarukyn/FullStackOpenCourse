# 0.5: Single page app diagram

## Exercie requirements

Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at <https://studies.cs.helsinki.fi/exampleapp/spa>.

## Solution Proposed

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

user->>browser: Note written + Clicked 'Save'

activate browser
    Note right of browser: Activate the submit func of the javascript file
    Note right of browser: Get the value from the form and create an element "note"
    Note right of browser: Push to the "notes" array te new element
    browser->>browser: Redraw the notes list with the new note
    browser->>server: Send an XMLHttpRequest() to endpoint '/new_note_spa' as a POST.
deactivate browser

activate server
    Note left of server: The "Content-type" Request header must be "application/json"
    Note left of server: The body of the request is a JSON with the new note data
    server->>server: Processes the new note and does whatever the server wants with it...
    server-->>browser: Responds with Code 201: Created
deactivate server

```
