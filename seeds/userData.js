const { User } = require('../models')

const userData =
  [
    {
      "name": "test",
      "email": "test@test.com",
      "password": "test"
    },
    {
      "name": "Lernantino",
      "email": "lernantino@gmail.com",
      "password": "password12345"
    },
    {
      "name": "Amiko",
      "email": "amiko2k20@aol.com",
      "password": "password12345"
    },
    {
      "name": "Mike",
      "email": "mikey99@msn.com",
      "password": "password12345"
    },
    {
      "name": "Tommy",
      "email": "tommy89@yahoo.com",
      "password": "password12345"
    }
  ]

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
})

module.exports = seedUsers