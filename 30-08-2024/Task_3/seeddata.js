const mongoose = require('mongoose');
const Dashboard = require('./models/dashboard');  
const Login = require('./models/login');  
const Register = require('./models/register'); 

// Connect to MongoDB
mongoose.connect("mongodb+srv://benny:ZLeywBCdV1aybO9s@cluster0.6vovitk.mongodb.net/Todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

// Dummy Data for Dashboard
const dashboardData = [
    {
        task: "Complete Project Documentation",
        description: "Finish the final draft of the project documentation and submit it for review.",
        date: "01 Sep 2024",
        time: "14:30",
        categoryChoosed: "Work",
        completed: false
    },
    {
        task: "Grocery Shopping",
        description: "Buy groceries for the week.",
        date: "02 Sep 2024",
        time: "10:00",
        categoryChoosed: "Personal",
        completed: false
    },
    {
        task: "Call with Client",
        description: "Discuss the project requirements with the client.",
        date: "03 Sep 2024",
        time: "16:00",
        categoryChoosed: "Work",
        completed: false
    }
];

// Dummy Data for Login
const loginData = [
    {
        email: "user1@example.com",
        password: "password123"
    },
    {
        email: "user2@example.com",
        password: "password456"
    },
    {
        email: "user3@example.com",
        password: "password789"
    }
];

// Dummy Data for Register
const registerData = [
    {
        name: "John",
        lastName: "Doe",
        phone: "1234567890",
        email: "user2@example.com",
        password: "password123"
    },
    {
        name: "Jane",
        lastName: "Smith",
        phone: "0987654321",
        email: "user1@example.com",
        password: "password456"
    },
    {
        name: "Alice",
        lastName: "Johnson",
        phone: "1122334455",
        email: "user3@example.com",
        password: "password789"
    }
];

// Insert Dummy Data into MongoDB
const insertDummyData = async () => {
    try {
        await Dashboard.insertMany(dashboardData);
        console.log('Dashboard data inserted');

        await Login.insertMany(loginData);
        console.log('Login data inserted');

        await Register.insertMany(registerData);
        console.log('Register data inserted');

        mongoose.connection.close();
    } catch (err) {
        console.error('Error inserting data', err);
    }
};

insertDummyData();
