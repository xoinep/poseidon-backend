const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swagggerFile = require('./swagger_output.json');
const checkTokenMiddleware = require('./utils/checkToken.middleware');
const { handleError } = require('./utils/error');

/* Routes */
const router = require('./routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swagggerFile));
app.use(checkTokenMiddleware);
app.use(router);

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect(
  'mongodb+srv://poseidon-dev-admin:Vermiw-jyhqut-0zugja@poseidon-dev.5v6k7.mongodb.net/poseidon-dev?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected Succesfully!!');
});
