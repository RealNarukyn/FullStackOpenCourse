# 0.4: New note diagram

## Exercie requirements

Create a similar diagram depicting the situation where the user creates a new note on the page <https://studies.cs.helsinki.fi/exampleapp/notes> by writing something into the text field and clicking the Save button.

If necessary, show operations on the browser or on the server as comments on the diagram.

The diagram does not have to be a sequence diagram. Any sensible way of presenting the events is fine.

## Solution Proposed

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    browser->>server: Asks for the web's HTML, CSS, JS Documents, Raw Data
    activate server
        server-->>browser: Gives back all the data
    deactivate server
    Note right of browser: This process is explained in the Example Diagram

    
    
user->>browser: Note written + Clicked 'Save'

activate browser
    browser->>server: Submit the POST form to /new_note with the Written Note
deactivate browser

activate server
    Note left of server: Here the server adds the note to the local array
    server-->>browser: Responds with a HTTP Status Code 302
deactivate server

activate browser
    Note right of browser: Status Code 302 = URL redirect
    browser->>server: New HTTP GET Request to the address demanded by the server
    Note left of server: The redirect endpoint is found in the headers response which is: '/notes'
deactivate browser

activate server
    server-->>browser: Sends to the browswer the HTML documen
deactivate server

activate browser
browser->>server: Fetch style sheet (main.css), JavaScript code (main.js), and raw data notes (data.json)
deactivate browser

activate server
    server-->>browser: Responds with the requested data files 
deactivate server

activate browser
    browser-->>user: The browser shows the data submitted with the form
deactivate browser

```
