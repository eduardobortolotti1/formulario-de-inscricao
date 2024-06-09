import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import pg from "pg";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

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
  res.render("index.ejs");
});

app.post("/submit", upload.single("pdf"), async (req, res) => {
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
  } = req.body
  const file = req.file;
  // Checando se todos os valores obrigatórios foram enviados
  if (!nome || !email || !data_nascimento || !cpf || !rg || !celular || !cidade || !cargo || !file){
    return res.status(400).json("Bad request");
  }

  try {
    // Insert data into PostgreSQL
    const insertQuery = `
      INSERT INTO inscricoes (nome, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, pdf_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id`;
    
    const values = [nome, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, file.path];

    const { rows } = await db.query(insertQuery, values);
    const insertedId = rows[0].id;

    res.status(201).json({ id: insertedId, message: "Data inserted successfully" });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/query", async (req, res) => {
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

app.get("/getCidades", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
