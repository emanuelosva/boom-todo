# Boom Todo Server

BoomTodo Server is a Full REST API for manage backend operations of BoomTodo.
A simple todo list app but with a scalable amd powerfull code base.

BoomTodo was written with TypeScript and implements a express server.

You can see the demo API docs [**-- here --**](http://34.69.218.129/api-docs)

## Tech Stack

- **TypeScript**
- **Express** (As a node serve)
- **PrismaDb** (As ORM layer)
- **Joi** (As a schema validation tool)
- **JWT** (For authentication and authorization)
- **Django** (As a AUTH micro service [It was for an educational requirement])

## Intallation (Backedn only)

First install the py env

```bash
# Install python dependencies
python3 -m venv .env
pip3 install -r server/db-auth-services/requirements.txt

# Make Migrations
python3 db-auth-services/db-auth/manage.py makemigration
python3 db-auth-services/db-auth/manage.py migrate
```

And then install the npm package

```bash
npm install
npx prisma generate
```

Run tests

```
npm run test
npm run test:coverage
npm run test:report
```

Run server

```bash
npm run dev # for development
npm run build # to generate the js version
npm run start # to start the production server
```

## Author
- Emanuel Osorio <emanuelosva@gmail.com>
