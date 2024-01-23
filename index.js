const express = require('express');
const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const app = express();

app.use(express.json());

async function createConnection() {
  const connection = await mysql.createConnection(config);
  return connection;
}

async function createTable(connection) {
  const sql =
    'CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))';
  await connection.execute(sql);
}

async function createPerson(connection) {
  const sql = `INSERT INTO people(name) values('${faker.person.fullName()}')`;
  await connection.execute(sql);
}

async function getPeople(connection) {
  const [rows] = await connection.execute('SELECT * FROM people');
  return rows;
}

app.get('/', async (_, res) => {
  const connection = await createConnection();
  await createTable(connection);
  await createPerson(connection);
  const people = await getPeople(connection);
  res.send(
    `<h1>Full Cycle Rocks!</h1>
    <ul>${people.map((person) => `<li>${person.name}</li>`).join('')}
    </ul>`
  );
});

app.listen(3000, () => {
  console.log('Running server');
});
