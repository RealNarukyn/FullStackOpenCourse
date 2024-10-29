# [The Phonebook Backend Exercise](https://thephonebook-white-surf-4069.fly.dev/api/persons)

__In case the link in the title does not work it's: https://thephonebook-white-surf-4069.fly.dev/api/persons__

This folder contains the exercises:

- 3.1: The Phonebook Step 1     ✔ (15min)
- 3.2: The Phonebook Step 2     ✔ (10 min)
- 3.3: The Phonebook Step 3     ✔ (5 min)
- 3.4: The Phonebook Step 4     ✔ (5 min)
- 3.5: The Phonebook Step 5     ✔ (10 min)
- 3.6: The Phonebook Step 6     ✔ (5 min)
- 3.7: The Phonebook Step 7     ✔ (5 min)
- 3.8: The Phonebook Step 8     ✔ (15 min)
- 3.9: The Phonebook Step 9     ✔ (5 min)
- 3.10: The Phonebook Step 10   ✔ (30 min)
- 3.11: The Phonebook Step 11   ✔ (1:30 min)


## 3.1: Phonebook backend step 1

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

Data:

```json
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
```

Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

The application must be started with the command npm start.

The application must also offer an npm run dev command that will run the application and restart the server whenever changes are made and saved to a file in the source code.


## 3.2: Phonebook backend step 2

Implement a page at the address http://localhost:3001/info that looks roughly like this:

The page has to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

There can only be one response.send() statement in an Express app route. Once you send a response to the client using response.send(), the request-response cycle is complete and no further response can be sent.

To include a line space in the output, use <br/> tag, or wrap the statements in <p> tags.


## 3.3: Phonebook backend step 3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## 3.4: Phonebook backend step 4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.

## 3.5: Phonebook backend step 5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

## 3.6: Phonebook backend step 6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

```js
{ error: 'name must be unique' }
```


## 3.7: Phonebook backend step 7

Add the morgan middleware to your application for logging. Configure it to log messages to your console based on the tiny configuration.

The documentation for Morgan is not the best, and you may have to spend some time figuring out how to configure it correctly. However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

Morgan is installed just like all other libraries with the npm install command. Taking morgan into use happens the same way as configuring any other middleware by using the app.use command.

## 3.8*: Phonebook backend step 8

Configure morgan so that it also shows the data sent in HTTP POST requests:

Note that logging data even in the console can be dangerous since it can contain sensitive data and may violate local privacy law (e.g. GDPR in EU) or business-standard. In this exercise, you don't have to worry about privacy issues, but in practice, try not to log any sensitive data.

This exercise can be quite challenging, even though the solution does not require a lot of code.

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

- creating new tokens
- JSON.stringify

## 3.9 Phonebook backend step 9

Make the backend work with the phonebook frontend from the exercises of the previous part. Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17.

You will probably have to do some small changes to the frontend, at least to the URLs for the backend. Remember to keep the developer console open in your browser. If some HTTP requests fail, you should check from the Network-tab what is going on. Keep an eye on the backend's console as well. If you did not do the previous exercise, it is worth it to print the request data or request.body to the console in the event handler responsible for POST requests.

## 3.10 Phonebook backend step 10

Deploy the backend to the internet, for example to Fly.io or Render.

Test the deployed backend with a browser and Postman or VS Code REST client to ensure it works.

PRO TIP: When you deploy your application to Internet, it is worth it to at least in the beginning keep an eye on the logs of the application AT ALL TIMES.

Create a README.md at the root of your repository, and add a link to your online application to it.

NOTE: as it was said, you should deploy the BACKEND to the cloud service. If you are using Fly.io the commands should be run in the root directory of the backend (that is, in the same directory where the backend package.json is). In case of using Render, the backend must be in the root of your repository.

You shall NOT be deploying the frontend directly at any stage of this part. It is just backend repository that is deployed throughout the whole part, nothing else.

## 3.11 Full Stack Phonebook

```
Using 'Fly' remove the dist from .dockerignore and .gitignore when doing 'fly deploy'. Otherwise the docker container won't push the dist directory and won't load the index.html
```

Generate a production build of your frontend, and add it to the Internet application using the method introduced in this part.

NB If you use Render, make sure the directory dist is not ignored by git on the backend.

Also, make sure that the frontend still works locally (in development mode when started with command npm run dev).

If you have problems getting the app working make sure that your directory structure matches the example app.

## 3.12 Command-line database
Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

NB: Do not include the password in the file that you commit and push to GitHub!

## 3.13 Phonebook database, step 1
Change the fetching of all phonebook entries so that the data is fetched from the database.

Verify that the frontend works after the changes have been made.

In the following exercises, write all Mongoose-specific code into its own module, just like we did in the chapter Database configuration into its own module.

## 3.14 Phonebook database, step 2
Change the backend so that new numbers are saved to the database. Verify that your frontend still works after the changes.

At this stage, you can ignore whether there is already a person in the database with the same name as the person you are adding.

## 3.15: Phonebook database, step 3
Change the backend so that deleting phonebook entries is reflected in the database.

Verify that the frontend still works after making the changes.

## 3.16: Phonebook database, step 4
Move the error handling of the application to a new error handler middleware.

## 3.17*: Phonebook database, step 5
If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.

## 3.18*: Phonebook database step 6
Also update the handling of the api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.


___
# 🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟

## To deploy in fly:

**If it's already on the cloud...** Whenever you make changes to the application, you can take the new version to production with a command

```bash
fly deploy
```

Start by authenticating via the command line with the command

```bash
fly auth login
```

Initializing an app happens by running the following command in the root directory of the app

```bash
fly launch --no-deploy
```

Give the app a name or let Fly.io auto-generate one. Pick a region where the app will be run.

Fly.io creates a file fly.toml in the root of your app where we can configure it. To get the app up and running we might need to do a small addition to the configuration:

```
[build]

[env]
  PORT = "3000" # add this

[http_service]
  internal_port = 3000 # ensure that this is same as PORT
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
  processes = ["app"]
```

We are now ready to deploy the app to the Fly.io servers. That is done with the following command:

```bash
fly deploy
```

**Note**: Fly may create 2 machines for your app, if it does then the state of the data in your app will be inconsistent between requests, i.e. you would have two machines each with its own notes variable, you could POST to one machine then your next GET could go to another machine. 

You can check the number of machines by using the command "$ fly scale show", if the COUNT is greater than 1 then you can enforce it to be 1 with the command 

``` bash 
fly scale count 1
```

The machine count can also be checked on the dashboard.