const express = require('express');
const cors = require('cors'); // Import the middleware cors
const fileRoutes = require('./routes/fileRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes'); // Import user routes

require('./database/firebaseconfig'); // Ensure Firebase is initialized

const app = express();
const port = process.env.PORT || 9000;

app.use(cors()); // Use the middleware cors
app.use(express.json());
app.use('/api', fileRoutes);
app.use('/api', reportRoutes);
app.use('/api', userRoutes); // Use user routes

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});