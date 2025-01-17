const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const fileRoutes = require('./routes/fileRoutes');
const reportRoutes = require('./routes/reportRoutes');

require('./database/firebaseconfig'); // Ensure Firebase is initialized

const app = express();
const port = process.env.PORT || 9000;

app.use(cors()); // Usa el middleware cors
app.use(express.json());
app.use('/api', fileRoutes);
app.use('/api', reportRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});