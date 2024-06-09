import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  password: "jogador9",
  host: "localhost",
  database: "form",
  port: 5432,
});

db.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));
  
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/query", async (req, res) => {
  const cidadeID = req.query.cidadeID;
  if (!cidadeID) {
    return res.status(400).json({ error: `Bad request. Failed to fetch data for: ${cidadeID}` });
  }
  try {
    const response = (await db.query(`
    SELECT vagas.id, cargos.nome_cargo, vagas.quantidade_vagas
    FROM vagas
    JOIN cargos ON cargos.id = vagas.cargo_id
    JOIN cidades ON cidades.id = vagas.cidade_id
    WHERE vagas.cidade_id=${cidadeID};
    `)).rows;
    return res.json(response);  
}
  catch (err) {
    return res.status(400).json({ error: `Bad request. Failed to fetch data for: ${cidadeID}` });
  }
});

app.get("/getCidades", async(req, res) => {
  try {
    const response = (await db.query(`
    SELECT id, nome_cidade FROM public.cidades
    ORDER BY id ASC
    `)).rows;
    return res.json(response);  
  }
  catch (err) {
    return res.status(400).json({ error: `Bad request. Failed to fetch data for: ${cidadeID}` });
  }
});
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
