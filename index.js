const express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config/database'),
    bodyParser = require('body-parser'),
    port = process.env.port || 8080;

const app = express();
app.use(bodyParser.json());

// ========== Connecting to Database ==========
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.on('connected', () => console.log('Connected to database :' + config.database));
mongoose.connection.on('error', (err) => console.log(err));

// ========== Routes Configuration ==========
const CustomerRoutes = require('./routes/customerRoutes');
app.use('/api/customer', CustomerRoutes);

const CertificateRoutes = require('./routes/certificateRoutes');
app.use('/api/certificate', CertificateRoutes);


// ========== Listening the app at port ==========
app.listen(port, () => console.log(`Listening at port : ${port}`));