## My Store Backend

NodeJS, ExpressJS, GrapQL, KnexJS, and Postgres

### How to run

1. Install Dependencies

```
$ yarn install // or npm i
```

2. Make sure your database (Postgres) server is running (local or remote)
3. Change the database config inside `src/database/knexfile.js`
4. Do the migration and seeding by running this command

```
$ cd src/database
$ npx knex migrate:latest
$ npx knex seed:run
```

5. Run the app

```
$ yarn dev // or npm run dev
```

6. Open the GraphiQL ```http://localhost:8080/graphql```

### Operations

- [x] Mutate: Create new merchant

```
mutation {
     createMerchant(input: {name: "new m1", phone_number: "0851423", latitude: "0", longitude: "0"}) {
        id
        name
     }
}
```

- [x] Query: Fetch merchants (with pagination and sorting)

```
query {
    merchants(filter: {page: {limit: 5, offset: 5}, sorts: [{column: NAME, order: DESC}, {column: ID, order: ASC}]}) {
        totalCount,
        results{
            id,
            name
        }
    }
}
```

- [x] Query: Fetch merchant by ID

```
query {
    merchant(id: 14) {
        id
        name
        is_active
    }
}
```

- [x] Mutate: Update a merchant by ID

```
mutation {
    updateMerchant(id: 14, input: {name: "new m1 updated2", is_active: false}) {
        id
        name
        is_active
    }
}
```

- [x] Mutate: Update bulk merchants by IDs

```
mutation {
    updateMerchants(ids: [11, 13], input: {is_active: true}) {
        id
        name
        is_active
    }
}
```

- [x] Mutate: Activated all merchants

```
mutation {
    activatedAllMerchants {
        id,
        name,
        is_active
    }
}
```

- [x] Mutate: Deactivated all merchants

```
mutation {
    deactivatedAllMerchants {
        id,
        name,
        is_active
    }
}
```

