const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const DB = 'flowerszDB';

app.use(cors());
app.use(express.json(),express.urlencoded({extended:true}));

require('./config/mongoose.config')(DB);
require('./routes/text.routes')(app);

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});