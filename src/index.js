import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import flash from "express-flash";
// File storage handling
import multer from "multer";
import fs from "fs";
import path from "path";
// Data sanitization and validation functions
import { remove_not_num, testacpf } from "./utils.js";
import validator from "email-validator";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: "uepa_2024", // Replace "your_secret_key" with a strong, unique string.
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Using memoryStorage engine
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB MAX
  },
  fileFilter: fileFilter
});

// PosgreSQL connection. CHANGE CREDENTIALS AS NEEDED!
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

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/api/submit", (req, res) => {
  // Mounting multer manually to upload files and using a callback function to handle file uploading errors.
  upload.single("pdf")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.error("Multer error:", err);
      req.flash("error", "ERRO: APENAS PDFs são permitidos!");
      return res.status(400).render("form");
    } else if (err) {
      // An unknown error occurred.
      console.error("Unknown error during file upload:", err);
      req.flash("error", "ERRO: Algo deu errado ao salvar seu arquivo!")
      return res.status(500).render("form");
    }

    // Proceed to handle the form data if no error occurred
    handleFormData(req, res);
  });
  async function handleFormData(req, res) {
    let {
      nome,
      sexo,
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

    // DATA VALIDATION, before and after sanitization.
    // Check if all required fields are present
    if (!nome || !sexo || !email || !data_nascimento || !cpf || !rg || !celular || !cidade || !cargo || !file) {
      return res.status(400).render("form");
    }

    // Data sanitization
    cpf = remove_not_num(cpf);
    rg = remove_not_num(rg);
    celular = remove_not_num(celular);
    telefone = remove_not_num(telefone);
    cidade = remove_not_num(cidade);
    cargo = remove_not_num(cargo);

    // Check if all required fields are present
    if (!nome || !sexo || !email || !data_nascimento || !cpf || !rg || !celular || !cidade || !cargo || !file) {
      req.flash("error", "ERRO: Algo deu errado no seu registro!")
      return res.status(400).render("form");
    }
    // Data validation
    if (!(testacpf(cpf))) {
      req.flash("error", "ERRO: Algo deu errado no seu registro!")
      return res.status(400).render("form");
    }
    if (!(validator.validate(email))) {
      req.flash("error", "ERRO: Algo deu errado no seu registro!")
      return res.status(400).render("form");
    }

    // Create pdf_path to save file after query
    const pdf_path = path.join("uploads", `${Date.now()}.pdf`);

    try {
      // Parametized query to prevent SQl injection attacks
      const insertQuery = `
      INSERT INTO inscricoes (nome, sexo, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, pdf_path)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id`;

      const values = [nome, sexo, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, pdf_path];
      await db.query("BEGIN");
      const { rows } = await db.query(insertQuery, values);
      const insertedId = rows[0].id;
      await db.query("COMMIT");

      // Save the file to /uploads ONLY after the query is successfully made
      fs.writeFileSync(pdf_path, file.buffer);
      // Return success message
      req.flash("success", "Sua inscrição foi feita com sucesso!");

      return res.status(201).render("form");
    }
    catch (err) {
      await db.query("ROLLBACK"); // Rollback in case of error
      console.error("Error executing query", err);
      req.flash("error", "ERRO: Algo deu errado no seu registro!")
      return res.status(400).render("form");
    }
  }
})

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
  console.log("Shutting down server...");
  db.end()
    .then(() => {
      console.log("Database connection closed.");
      process.exit(0);
    })
    .catch(err => {
      console.error("Error closing database connection", err);
      process.exit(1);
    });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
