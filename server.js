const express = require('express');
const db = require('./config/database');

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
	console.log(req.socket.remoteAddress);
	res.send('API Running');
});

// Sync Database
db.sync();

// Define Routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
require('./routes/api/dataset')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
	console.log(`Server started on port ${PORT}`);
});
