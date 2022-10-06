const {faker} = require('@faker-js/faker')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('merchants').del()

  const activeMerchants = Array.apply(null, Array(15)).map(() => ({
    name: faker.company.name(),
    phone_number: faker.phone.number(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    is_active: true
  }))

  const inActiveMerchants = Array.apply(null, Array(5)).map(() => ({
    name: faker.company.name(),
    phone_number: faker.phone.number(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    is_active: false
  }))

  await knex('merchants').insert([...activeMerchants, ...inActiveMerchants]);
};
