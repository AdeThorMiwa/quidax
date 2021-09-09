# Quidax Books

## A flimsy book company

A book api built with a micro-service architecture and supports both REST and GraphQl access protocol through an api gateway. This application was built / bootstraped with Nestjs.

**Note: This project is divided into two parts. A micro-service with the actual api implementations, and an Api Gateway on top of it that exposes the endpoints both as REST and Graphql.**
**Note: This project includes a swagger documentation, where with you can see all REST api endpoint provided by the app. Can be accessed on ${host}/api**
**Note: This project includes a graphql playground, where you can test the graphql endpoint exposed. Can be access on ${host}/gql**
**Note: This project includes a compodoc documentation, where you can see the full architectural layout of the app.**

## Modules

- User - Everything that deals with user management (register, update, delete, e.tc)
- Book - Everything that deals with book management and modification (add book, update book, like book)
- Publication - Everything that deals with publication owning a book
- Cart - Everything that deals with user's cart (new cart, update cart, cart item edit)

## Misc Features

- includes a query builder that allows smooth filtering of data
- Supports pagination
- Support custom data selection on REST
- Support custom sorting of Data

## Installation

An easy installation and setup steps.

Install the dependencies and devDependencies for the 2 parts of the app and start the 2 servers concurrently.

```sh
cd quidax
yarn install:dev
yarn start:dev
```

## Requirements (that hasn't been done)

- Didn't really have enough time to write test
- Serving static asset

## Issues Faced

- there wasn't really a definite line between what is sposed to be a frontend aspect of the task which is specifically backend.. that sorta created a delay in design of the architecture

## Constructive Feeback

I Feel backend guys should either be delivered a concise specification and should have to figure what is what, judging with the time provided.(just a thought tho).

And a possible improvement to the app is separation each module in the micro-service into individual app and make the quidax a mono-repo, being an indivual repo deployed to scale horizontally i think will help with scaling and resilience issue. The reason for the microservice architectural design is to decrease the blast radius of a downtime of any of the module.
Also, the communication protocol/pattern of the microserice may be changed to an event based system instead of the current TCP request/response, using technologies like RabbitMQ or kafka. which will even make it more resilient to server issues that occurs as a result of too many request.
