# Boom Todo
A simple todo list project with a powerful code base.

## About 

BoomTodo is a SPA written on top of Sapper and Svelte for the frontend client and
implements a REST API served with express and written in TypeScript.

This app is part of a challenge of my mentor in Platzi Master Program. I had to build a todo list but with scalable and powerfull backend code base and only in one week. This is the result!

- You can see the demo deployed in a Compute Engine instance [**-- here --**](http://34.69.218.129/)

- And a the static api docs: [**-- here --**](http://34.69.218.129/api-docs)

<p>
  <img align="center" src="https://user-images.githubusercontent.com/62397465/94326421-676bfa00-ff69-11ea-80cc-e60b1e24401d.png" alt="Preview 1" height="320px" width="140px" />
  <img align="center" src="https://user-images.githubusercontent.com/62397465/94326495-cf224500-ff69-11ea-8207-4512e6d3e68a.png" alt="Preview 2" height="320px" width="140px" />
</p>


## Tech Stack

- Frontend:
  - **Sapper** (Server side render for Svelte)
  - **Svelte**
  - **Axios** (As a API client engine)
  - **Express** (As a node server)
  - **CookieParser** (For manage the cookie session)

- Backend:

  - **TypeScript**
  - **Express** (As a node serve)
  - **PrismaDb** (As ORM layer)
  - **Joi** (As a schema validation tool)
  - **JWT** (For authentication and authorization)
  - **Django** (As a AUTH micro service [It was for an educational requirement])

- Db Diagram:

![](https://user-images.githubusercontent.com/62397465/94471726-41c03a00-018f-11eb-9feb-8543954b5d48.png)


## You can run this project.

Clone this repository and:

```
# Setup the project.

bash setup.sh
```

You need to install pm2.

```bash
sudo npm install -g pm2
```

To run all services only execute:

```bash
pm2 start ecosystem.config.js
```

## Author
- Emanuel Osorio <emanuelosva@gmail.com>
