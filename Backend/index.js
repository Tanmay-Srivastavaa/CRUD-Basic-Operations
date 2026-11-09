const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",  
    password: "Tanmay#123",      
    database: "studentsdb"
});

// Connect Database
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

//  CREATE 

app.post("/add", (req, res) => {

    const { name, age } = req.body;

    const sql2 = "INSERT INTO students(name, age) VALUES (?, ?)";

    db.query(sql2, [name, age], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Student Added Successfully"
        });

    });

});

//  READ 

app.get("/students", (req, res) => {

    const sql2 = "SELECT * FROM students";

    db.query(sql2, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

//  UPDATE 

app.put("/update/:id", (req, res) => {

    const id = req.params.id;

    const { name, age } = req.body;

    const sql2 = "UPDATE students SET name=?, age=? WHERE id=?";

    db.query(sql2, [name, age, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Student Updated Successfully"
        });

    });

});

//  DELETE 

app.delete("/delete/:id", (req, res) => {

    const id = req.params.id;

    const sql2 = "DELETE FROM students WHERE id=?";

    db.query(sql2, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Student Deleted Successfully"
        });

    });

});

// Server

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});