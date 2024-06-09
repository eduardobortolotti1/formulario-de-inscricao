import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import pg from "pg";
import fs from "fs";
import path from "path";

const port = 3000;
const app = express();

// Using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set EJS as the default view engine
app.set("view engine", "ejs");

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDFs are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB
  },
  fileFilter: fileFilter
});

const db = new pg.Client({
  user: "postgres",
  password: "jogador9",
  host: "localhost",
  database: "form",
  port: 5432,
});

db.connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/api/submit", upload.single("pdf"), async (req, res) => {
  const {
    nome,
    email,
    data_nascimento,
    cpf,
    rg,
    celular,
    telefone,
    cidade,
    cargo,
  } = req.body;
  const file = req.file;

  // Check if all required fields are present
  if (!nome || !email || !data_nascimento || !cpf || !rg || !celular || !cidade || !cargo || !file) {
    return res.status(400).json({ error: "Bad request" });
  }

  // Create pdf_path to save on query
  const pdf_path = path.join('uploads', `${Date.now()}-${file.originalname}`);
  console.log(pdf_path);

  try {
    // Insert data into PostgreSQL
    const insertQuery = `
      INSERT INTO inscricoes (nome, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, pdf_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id`;

    const values = [nome, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, pdf_path];

    const { rows } = await db.query(insertQuery, values);
    const insertedId = rows[0].id;

    // Save the file to /uploads ONLY after the query is successfully made
    fs.writeFileSync(pdf_path, file.buffer);
    res.status(201).json({ id: insertedId, message: "Data inserted successfully" });

  }
  catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/api/query", async (req, res) => {
  const cidadeID = req.query.cidadeID;
  if (!cidadeID) {
    return res
      .status(400)
      .json({ error: `Bad request. Failed to fetch data for: ${cidadeID}` });
  }
  try {
    const response = (
      await db.query(`
      SELECT cargos.id, cargos.nome_cargo
      FROM vagas
      JOIN cargos ON cargos.id = vagas.cargo_id
      WHERE vagas.cidade_id=${cidadeID};
    `)
    ).rows;
    return res.json(response);
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Bad request. Failed to fetch data for: ${cidadeID}` });
  }
});

app.get("/api/getCidades", async (req, res) => {
  try {
    const response = (
      await db.query(`
    SELECT id, nome_cidade FROM public.cidades
    ORDER BY id ASC
    `)
    ).rows;
    return res.json(response);
  } catch (err) {
    return res
      .status(400)
      .json({ error: `Bad request. Failed to fetch data for: ${cidadeID}` });
  }
});

const shutdown = () => {
  console.log('Shutting down server...');
  db.end()
    .then(() => {
      console.log('Database connection closed.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error closing database connection', err);
      process.exit(1);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
