const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = require('http').Server(app),
		  io = require('socket.io')(server);
		
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS courses (title VARCHAR not null, url VARCHAR not null)')
  .catch(err => console.log(err));
pgClient
  .query("INSERT INTO courses (title, url) VALUES ('¿Que es PLE?','https://www.youtube.com/watch?v=d7PR_uo5gaE')")
  .catch(err => console.log(err));
pgClient
  .query("INSERT INTO courses (title, url) VALUES ('PLE Entornos Personales de Aprendisaje','https://www.youtube.com/watch?v=MPUlHtYfSzA')")
  .catch(err => console.log(err));
pgClient
  .query("INSERT INTO courses (title, url) VALUES ('PLE by Jordi Adell','https://www.youtube.com/watch?v=blzYQlj63Cc')")
  .catch(err => console.log(err));
// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// Express route handlers

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/courses/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from courses');

  res.send(values.rows);
});

app.get('/courses/current', async (req, res) => {
  redisClient.hgetall('courses', (err, courses) => {
    res.send(courses);
  });
});

app.post('/courses', async (req, res) => {
  const { title, url } = req.body;

  
  if (title == "" || url == "") {
    return res.status(422).send('Faltan datos');
  }

  redisClient.hset('courses', title + value, 'Nothing yet!');
  redisPublisher.publish('insert', [title, url]);
  pgClient.query('INSERT INTO courses(title,url) VALUES($1,$2)', [title,url]);

  res.send({ working: true });
});

io.on('connection', (socket) => {
	console.log('Connected OK');
	socket.on('streaming', (image) => {
    console.log(image);
		io.emit('play stream', image);
	})
});

server.listen(5000, err => {
  console.log('Listening in port 5000');
});
/*
const		app2 = express(),
		server = require('http').Server(app2),
		io = require('socket.io')(server),
		PORT = 5001,
		publicDir = `${__dirname}/public`

io.on('connection', (socket) => {
	console.log('Connected OK');
	socket.on('streaming', (image) => {
    console.log(image);
		io.emit('play stream', image);
	})
});


server.listen(PORT, () => {
	console.log(`socketIO en localhost: ${PORT}`);
});
*/