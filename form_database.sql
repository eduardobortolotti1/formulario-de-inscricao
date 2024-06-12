--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-12 00:54:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16552)
-- Name: cargos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargos (
    id integer NOT NULL,
    nome_cargo text NOT NULL
);


ALTER TABLE public.cargos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16551)
-- Name: cargos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargos_id_seq OWNER TO postgres;

--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 219
-- Name: cargos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargos_id_seq OWNED BY public.cargos.id;


--
-- TOC entry 216 (class 1259 OID 16531)
-- Name: cidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cidades (
    id integer NOT NULL,
    nome_cidade text
);


ALTER TABLE public.cidades OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16530)
-- Name: cidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cidades_id_seq OWNER TO postgres;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 215
-- Name: cidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cidades_id_seq OWNED BY public.cidades.id;


--
-- TOC entry 222 (class 1259 OID 16700)
-- Name: inscricoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscricoes (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    sexo character varying(20),
    email character varying(255) NOT NULL,
    data_nascimento date NOT NULL,
    cpf character varying(20) NOT NULL,
    rg character varying(20) NOT NULL,
    celular character varying(20) NOT NULL,
    telefone character varying(20),
    cidade integer NOT NULL,
    cargo integer NOT NULL,
    pdf_path character varying(255)
);


ALTER TABLE public.inscricoes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16699)
-- Name: inscricoes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inscricoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inscricoes_id_seq OWNER TO postgres;

--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 221
-- Name: inscricoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inscricoes_id_seq OWNED BY public.inscricoes.id;


--
-- TOC entry 218 (class 1259 OID 16540)
-- Name: vagas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vagas (
    id integer NOT NULL,
    cargo_id integer NOT NULL,
    cidade_id integer NOT NULL,
    quantidade_vagas integer
);


ALTER TABLE public.vagas OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16539)
-- Name: vagas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vagas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vagas_id_seq OWNER TO postgres;

--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 217
-- Name: vagas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vagas_id_seq OWNED BY public.vagas.id;


--
-- TOC entry 4705 (class 2604 OID 16555)
-- Name: cargos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos ALTER COLUMN id SET DEFAULT nextval('public.cargos_id_seq'::regclass);


--
-- TOC entry 4703 (class 2604 OID 16534)
-- Name: cidades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cidades ALTER COLUMN id SET DEFAULT nextval('public.cidades_id_seq'::regclass);


--
-- TOC entry 4706 (class 2604 OID 16703)
-- Name: inscricoes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscricoes ALTER COLUMN id SET DEFAULT nextval('public.inscricoes_id_seq'::regclass);


--
-- TOC entry 4704 (class 2604 OID 16543)
-- Name: vagas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vagas ALTER COLUMN id SET DEFAULT nextval('public.vagas_id_seq'::regclass);


--
-- TOC entry 4866 (class 0 OID 16552)
-- Dependencies: 220
-- Data for Name: cargos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cargos (id, nome_cargo) FROM stdin;
1	ARTÍFICE DE MANUTENÇÃO
2	AGENTE ADMINISTRATIVO
3	MOTORISTA
4	TÉCNICO A - PEDAGOGIA
5	TÉCNICO DE LABORATÓRIO (NÍVEL MÉDIO PROFISSIONALIZANTE)
6	TÉCNICO EM INFORMÁTICA (NÍVEL MÉDIO PROFISSIONALIZANTE)
7	AUXILIAR DE SERVIÇOS
8	TÉCNICO A - ANALISTA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO / TIC – DESENVOLVIMENTO DE SISTEMAS
9	TÉCNICO A - ANALISTA DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO / TIC – INFRAESTRUTURA DE REDE
10	TÉCNICO A – BACHARELADO EM SECRETARIADO EXECUTIVO
11	TÉCNICO A - BIOLOGIA
12	TÉCNICO A - COMUNICAÇÃO SOCIAL
13	TÉCNICO A - DESIGNER
14	TÉCNICO A - ENFERMAGEM
15	TÉCNICO A - ENGENHARIA AMBIENTAL
16	TÉCNICO A - MEDICINA CLÍNICA GERAL
17	TÉCNICO A - PSICOLOGIA
18	TÉCNICO A - SERVIÇO SOCIAL
19	TÉCNICO A – TRADUTOR E INTÉRPRETE DE LIBRAS
20	TÉCNICO EM ENFERMAGEM (NÍVEL MÉDIO PROFISSIONALIZANTE)
21	TRANSCRITOR DE BRAILLE
22	TÉCNICO A - BIBLIOTECONOMIA
\.


--
-- TOC entry 4862 (class 0 OID 16531)
-- Dependencies: 216
-- Data for Name: cidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cidades (id, nome_cidade) FROM stdin;
1	Altamira
2	Ananindeua
3	Barcarena
4	Belém
5	Cametá
6	Castanhal
7	Igarapé Açu
8	Marabá
9	Moju
10	Paragominas
11	Parauapebas
12	Redenção
13	Salvaterra
14	Santarém
15	São Miguel do Guamá
16	Tucuruí
\.


--
-- TOC entry 4868 (class 0 OID 16700)
-- Dependencies: 222
-- Data for Name: inscricoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscricoes (id, nome, sexo, email, data_nascimento, cpf, rg, celular, telefone, cidade, cargo, pdf_path) FROM stdin;
\.


--
-- TOC entry 4864 (class 0 OID 16540)
-- Dependencies: 218
-- Data for Name: vagas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vagas (id, cargo_id, cidade_id, quantidade_vagas) FROM stdin;
38	1	1	1
39	2	2	3
40	1	2	1
41	3	2	1
42	4	2	1
43	5	2	1
44	6	2	1
45	4	3	1
46	1	4	2
47	7	4	1
48	8	4	2
49	9	4	1
50	10	4	1
51	11	4	1
52	12	4	2
53	13	4	1
54	14	4	1
55	15	4	1
56	16	4	1
57	4	4	1
58	17	4	4
59	18	4	1
60	19	4	2
61	5	4	1
62	20	4	1
63	17	5	1
64	6	5	1
65	3	6	1
66	6	6	1
67	7	7	1
68	3	7	1
69	4	8	2
70	21	8	1
71	1	9	1
72	4	9	1
73	6	9	1
74	1	10	1
75	5	10	1
76	2	11	5
77	1	11	1
78	3	11	1
79	4	11	1
80	5	11	1
81	6	11	1
82	3	12	1
83	4	12	1
84	22	13	1
85	4	13	1
86	5	14	2
87	6	15	1
88	1	16	1
89	5	16	1
90	6	16	1
\.


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 219
-- Name: cargos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cargos_id_seq', 22, true);


--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 215
-- Name: cidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cidades_id_seq', 32, true);


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 221
-- Name: inscricoes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inscricoes_id_seq', 1, false);


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 217
-- Name: vagas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vagas_id_seq', 90, true);


--
-- TOC entry 4710 (class 2606 OID 16561)
-- Name: cargos cargos_nome_vaga_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_nome_vaga_key UNIQUE (nome_cargo);


--
-- TOC entry 4712 (class 2606 OID 16559)
-- Name: cargos cargos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16538)
-- Name: cidades cidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cidades
    ADD CONSTRAINT cidades_pkey PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 16707)
-- Name: inscricoes inscricoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscricoes
    ADD CONSTRAINT inscricoes_pkey PRIMARY KEY (id);


--
-- TOC entry 4716 (class 2606 OID 16713)
-- Name: inscricoes fk_cargo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscricoes
    ADD CONSTRAINT fk_cargo FOREIGN KEY (cargo) REFERENCES public.cargos(id);


--
-- TOC entry 4717 (class 2606 OID 16708)
-- Name: inscricoes fk_cidade; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscricoes
    ADD CONSTRAINT fk_cidade FOREIGN KEY (cidade) REFERENCES public.cidades(id);


--
-- TOC entry 4715 (class 2606 OID 16546)
-- Name: vagas vagas_cidade_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vagas
    ADD CONSTRAINT vagas_cidade_id_fkey FOREIGN KEY (cidade_id) REFERENCES public.cidades(id);


-- Completed on 2024-06-12 00:54:23

--
-- PostgreSQL database dump complete
--

