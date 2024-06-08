import express from "express"
import bodyParser from "body-parser"
import pg from "pg"

const port = 3000
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
    user: "postgres",
    password: "jogador9",
    host: "localhost",
    database: "form",
    port: 5432 ,
})

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    form_data = req.body;
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})