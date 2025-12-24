const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { Types } = require('mongoose');

function randomRole() {
  return Math.random() < 0.85 ? 'user' : 'admin';
}

async function generateMockUsers(count = 50) {
  const hashed = await bcrypt.hash('coder123', 10);
  const users = Array.from({ length: count }, () => ({
    _id: new Types.ObjectId(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: hashed,
    role: randomRole(),
    pets: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    __v: 0,
  }));
  return users;
}

function generateMockPets(count = 20) {
  const speciesList = ['dog', 'cat', 'hamster', 'parrot', 'rabbit'];
  return Array.from({ length: count }, () => ({
    _id: new Types.ObjectId(),
    name: faker.animal.dog().split(' ')[0],
    species: faker.helpers.arrayElement(speciesList),
    color: faker.color.human(),
    owner: null,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    __v: 0,
  }));
}

module.exports = { generateMockUsers, generateMockPets };
