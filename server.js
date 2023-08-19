const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
}
);

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"));
}
);

app.post("/api/notes", (req, res) => {
    const db = require("./db/db.json");
    const newNote = req.body;
    newNote.id = db.length + 1;
    db.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log("Note saved");
        res.json(db);
    });
}
);

app.listen(3000, () => console.log('Listening on PORT 3000'));