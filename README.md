## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5000] to view it in the browser.

The page will reload using nodemon if you make edits.\
You will also see any lint errors in the console.

<!-- ### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. -->

### `npm run start`

Run the build project in dist folder

### `npm run build`

Compile and build the project into dist folder


### `npx prisma migrate dev --name <name of your migration>`

- To migrate any changes to your schema using prismaORM
- Update the schema in prisma/schema.prisma and then run this command to sync up the change in your db




### setup your .env
- create a .env file and instantiate DATABASE_URL= to connect to your db
- this will be use by PrismaORM in prisma/schema.prisma to sync the schema and also to connect your project with the DB