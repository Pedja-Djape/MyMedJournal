
const mongoose = require('mongoose');

require('dotenv').config()

const dbConnect = async () => {
    try {
        const result = await mongoose.connect(
            process.env.DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true
            }
        );
        console.log('Successfully connected to MongoDB Atlas');
    } catch (error) {
        console.log('Couldnt connect');
        console.error(error);
    }
}

module.exports = dbConnect;
