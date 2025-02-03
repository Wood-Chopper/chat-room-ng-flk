# Chat Room Training

This training aims to improve the architecture good practices in Angular. It also uses technologies like AppSync Events and Flink, two technologies specific to the client.

## Overview

During 3 days, trainees will develop an Angular application. The application will progressively evolve from a standalone application to a production-like application.

The goal is to make the application evolve safely.

## Code snippets

Some code example are available in the folder `code_snippets`

## Day 1

This fist days will focus on building a scalable Angular architecture for your chat room use-case.

### Environment set up

Make sure you have the correct Angular version. Latest Angular being in version 19, lets make sure we have it.

Run this command to verify you Angular version:
```shell
ng --version
```
If you are in version 19, you are good. Otherwise, run the next commands.

First uninstall any previous version of Angular CLI:
```shell
npm uninstall -g @angular/cli
```

Then, install the latest version:
```shell
npm install -g @angular/cli@latest
```

> **Important:** those 2 previous commands need to be run outside an existing node project.

Try to run the Angular project in the folder ´chat-room-ng´

### Use-case and software architecture

You are asked to build a chatroom. The target is to exchange messages between different laptops.

Following the same Angular Architecture used in Ewon Cloud, schematise an architecture so that your Angular project can safely evolve to the target.

Use Miro to draw you schema. This schema will serve as a documentation base for the following days.

### Folder and file structure

You want your project structure to be as understandable as possible. create the folders following the architecture layers.

Regarding the files, try to follow some conventions:

| Type   | File name   |
|--------|-------------|
| Facade | *.facade.ts |
| Store  | *.store.ts  |
| Client | *.client.ts |
| DTO    | *.dto.ts    |
| model  | *.model.ts  |

### Domain layers

Now that we have our structure and some naming conventions, it's time to build our domain layer.

Start by creating your domain model. Your application will mainly work with messages.

When it's done write the domain facade and build the various methods you will need. Follow those steps:

* Write the method signatures without any implementation
* Write the observables that the facade exposes
* Deduce the dependencies you will need to make the facade work

### State layers

Having your domain layer, you can now create the state layer using the store class (see code snippet).

### Client Layer

Implement the abstract classes of the domain layer in the client layer. Remember to use DTOs at the client side.

For the client layer, use [json-server](https://www.npmjs.com/package/json-server) as API. Using json-server allows you to run your Angular application as a standalone application by providing a light local API server.

to run the local api, run this command:

```shell
npm run local-api
```

### View layer

Split your view layer into components. Make sure that are as dumb as possible. Logic code should go in the domain.

## Day 2

At this stage, we have a nice standalone application. But we can only talk to ourselves...

Let's send the message into the data pipeline. Later on, we will be able to save the messages in database and receive live messages.

### Send the message to Kinesis Data Stream

Modify you client implementation to send the messages to Kinesis Data Stream