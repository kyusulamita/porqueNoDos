# Porque No Dos?

![Alt Text](https://media.giphy.com/media/37sriqqivQrVH5qNIz/giphy.gif)

This is a simple application, meant to be a super simplified version of quickbooks. Mostly just for my parents who think quickbooks is too over over complicated.

## Setup

### Still under development
If you want to use this for yourself/expand on this idea, please fill free to do so!

* Create a new, empty directory on your machine and `git init` (or create an empty repo on Github and clone it to your local machine)
* Run the following commands:

```
git remote add porqueNoDos https://github.com/kyusulamita/porqueNoDos.git
git fetch porqueNoDos
git merge porqueNoDos/master
```

Why did did we just do that? Because every since it's still in development, `porqueNoDos` will be updated with additional features or bug fixes and now you will have access to those changes by doing!

```
git fetch porqueNoDos
git merge porqueNoDos/master
```


### Will be making another section once it is deployed
If you want to just install this and run it:
```
git clone https://github.com/kyusulamita/porqueNoDos.git
npm install
npm run start-dev
```

Why start-dev? because we're still in the development stage. I mean, I don't know why you would do it right now....but feel free :P

## Customize
Looking around the code you'll notice two things:
  * The database is already named for you and is created when you npm install.
  * A seed file is available for you, which creates ridiculous employees like Mr. Woof Woof.

In order to rename your DB just go to '/server/db/db.js' and rename the database.

```
const db = new Sequelize(
  process.env.DATABASE_URL || '{{NEW NAME HERE}}', {
    logging: false
  }
)
```

In order to change the name of your employees and other seeded info just meander on over to script/seed.js


## License

MIT
