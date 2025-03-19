import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Initialize Express
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = "mongodb://127.0.0.1:27017/editor"; // Update with your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Define MongoDB Schemas
const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    access: Number
});

const FileSchema = new mongoose.Schema({
    filename: String,
    content: String
});

// Create Models
const User = mongoose.model("User", UserSchema);
const File = mongoose.model("File", FileSchema);

// Routes

// Get user by name or email
app.get('/users', async (req, res) => {
    try {
        const name = req.query.name;
        const users = await User.findOne({ $or: [{ name }, { email: name }] });
        res.json(users);
        console.log('Data fetched successfully');
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
});

// Insert a new user
app.post('/insertUser', async (req, res) => {
    try {
        const { name, password, email } = req.body;
        const newUser = new User({ name, password, email });
        await newUser.save();
        console.log('User inserted successfully');
        res.status(200).send('User inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).send('Error inserting user');
    }
});

// Get all file names
app.get('/files', async (req, res) => {
    try {
        const files = await File.find({}, 'filename');
        res.json(files);
        console.log('Files fetched successfully');
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).send('Error fetching files');
    }
});

// Read a file's content
app.get('/read', async (req, res) => {
    try {
        const { fileName } = req.query;
        const file = await File.findOne({ filename: fileName });
        if (!file) return res.status(404).send('File not found');
        res.json(file);
        console.log('File fetched successfully');
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Error fetching file');
    }
});

// Update file content
app.post('/updateFile', async (req, res) => {
    try {
        const { fileName, content } = req.body;
        await File.updateOne({ filename: fileName }, { content });
        console.log('File updated successfully');
        res.status(200).send('File updated successfully');
    } catch (error) {
        console.error('Error updating file:', error);
        res.status(500).send('Error updating file');
    }
});

// Delete a file
app.post('/deletefile', async (req, res) => {
    try {
        const { fileName } = req.body;
        await File.deleteOne({ filename: fileName });
        console.log('File deleted successfully');
        res.status(200).send('File deleted successfully');
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Error deleting file');
    }
});

// Create a new file
app.post('/createnew', async (req, res) => {
    try {
        const { fileName, content } = req.body;
        const newFile = new File({ filename: fileName, content });
        await newFile.save();
        console.log('File created successfully');
        res.status(200).send('File created successfully');
    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).send('Error creating file');
    }
});

// Get all users with access levels
app.get('/access', async (req, res) => {
    try {
        const users = await User.find({}, 'name access');
        res.json(users);
        console.log('Access data fetched successfully');
    } catch (error) {
        console.error('Error fetching access data:', error);
        res.status(500).send('Error fetching access data');
    }
});

// Update user access level
app.post('/updateaccess', async (req, res) => {
    try {
        const { name, access } = req.body;
        await User.updateOne({ name }, { access });
        console.log('Access updated successfully');
        res.status(200).send('Access updated successfully');
    } catch (error) {
        console.error('Error updating access:', error);
        res.status(500).send('Error updating access');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
