const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Birthday = require('./models/Birthday');

dotenv.config();

const seedData = [
    { name: "John Doe", date: "1995-04-25", note: "College friend" },
    { name: "Sarah Ahmed", date: "2000-01-10", note: "Sister" },
    { name: "Ali Khalid", date: "1998-07-19", note: "Coworker" }
];

const seedDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await Birthday.deleteMany({});
    await Birthday.insertMany(seedData);
    console.log("✅ Database seeded!");
    mongoose.connection.close();
};

seedDB();
