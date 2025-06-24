--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    user_id integer,
    question_id integer,
    answer text NOT NULL,
    is_correct boolean,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.answers_id_seq OWNER TO postgres;

--
-- Name: answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.answers_id_seq OWNED BY public.answers.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    test_id integer,
    question_text text NOT NULL,
    question_type character varying(20),
    options text[],
    correct_answer text,
    CONSTRAINT questions_question_type_check CHECK (((question_type)::text = ANY ((ARRAY['multiple'::character varying, 'open'::character varying])::text[])))
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- Name: tests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tests_id_seq OWNER TO postgres;

--
-- Name: tests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tests_id_seq OWNED BY public.tests.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role character varying(20) DEFAULT 'user'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers ALTER COLUMN id SET DEFAULT nextval('public.answers_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: tests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests ALTER COLUMN id SET DEFAULT nextval('public.tests_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id, user_id, question_id, answer, is_correct, created_at) FROM stdin;
1	3	1	var	t	2025-06-19 17:39:22.516021
2	3	2	JS, tarayıcıda çalışır.	\N	2025-06-19 17:39:22.522454
3	3	1	var	t	2025-06-20 02:41:29.277668
4	3	2	asd	\N	2025-06-20 02:41:29.2948
5	3	3	asdasf	\N	2025-06-20 02:41:39.571483
6	3	4	CSS dosyası	f	2025-06-20 02:41:39.572405
11	2	1	var	t	2025-06-20 03:14:26.76035
12	2	2	asd	\N	2025-06-20 03:14:26.762012
15	5	1	var	t	2025-06-20 03:43:29.196742
16	5	2	asdasf	\N	2025-06-20 03:43:29.199725
17	3	1	var	t	2025-06-21 14:57:42.526844
18	3	2	p	\N	2025-06-21 14:57:42.529779
19	3	15	State	t	2025-06-21 15:24:39.481443
20	3	16	Veri saklamak için	f	2025-06-21 15:24:39.485574
21	3	17	useEffect()	t	2025-06-21 15:24:39.486452
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, test_id, question_text, question_type, options, correct_answer) FROM stdin;
1	1	JavaScript'te değişken tanımlamak için kullanılan anahtar kelime nedir?	multiple	{var,int,define,set}	var
2	1	JavaScript nedir?	open	{}	Bir programlama dilidir.
3	2	React nedir?	open	{}	Bir UI kütüphanesidir
4	2	JSX ne işe yarar?	multiple	{"Veritabanı bağlantısı","HTML benzeri yazım","CSS dosyası","Sunucu kodu"}	HTML benzeri yazım
14	8	HTTP isteklerinde GET metodu genellikle ne için kullanılır?\n\n	multiple	{"Veri göndermek","Veri silmek","Veri güncellemek","Veri almak"}	Veri almak
15	9	React’te bileşenlerin (component) UI’yi yeniden oluşturmasını sağlayan yapı hangisidir?\n\n	multiple	{Props,Hooks,State,Router}	State
16	9	React bileşenlerinde props ne işe yarar?	multiple	{"Veri saklamak için","Veriyi üst bileşenden alt bileşene iletmek için","CSS dosyalarını import etmek için","Veritabanına veri göndermek için"}	Veriyi üst bileşenden alt bileşene iletmek için
17	9	React’te hangi hook, bileşen yüklendiğinde bir defa çalışan kodu tanımlamak için kullanılır?	multiple	{useRef(),useEffect(),useState(),useMemo()}	useEffect()
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tests (id, title, description, created_by, created_at) FROM stdin;
1	JavaScript Temel Testi	JS hakkında temel sorular	2	2025-06-19 15:44:53.478371
2	React Bilgi Testi	React temel bilgileri ölçen test	2	2025-06-19 16:35:04.839146
8	HTTP istekleri	HTTP istekleriyle ilgili bilgi ölçer	3	2025-06-21 15:16:46.407528
9	React Bilgi Testi 2	React bilgisi ölçer	3	2025-06-21 15:19:18.239622
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, created_at, role) FROM stdin;
1	Eralp	aydineralp@gmail.com	$2b$10$WPphaq8jJrw3zMrp89VLCexwxUpQsySQwxLkET56hjc/aoUwzAkdm	2025-06-19 15:08:28.194507	user
2	Eralp	eralp@example.com	$2b$10$RYOQdhAn5j4eDV.mBMNS6.ldw3/AD5YkIxaFPTKli2urkPHU37omK	2025-06-19 15:13:11.139679	user
3	Beyza	karadag@example.com	$2b$10$kY/a99dkU7lmqpO13A7qh.PW72lAOTm58x4TWy3ne7qRtd20poIke	2025-06-19 17:05:58.84976	admin
4	mahmut	mahmut@gmail.com	$2b$10$RWxc8LwrpMpiaeHcP82HHe4iBJb359lSgqwYz04rGyP.uZJLCsE6y	2025-06-20 03:32:38.635112	user
5	saa	sansar@gmail.com	$2b$10$FS4OEP/Izkak0/cW8jjOO..5J/ePV0vcl7VFCZ1mQYNquaidUo9.6	2025-06-20 03:43:07.585823	user
6	veysel	veysel@gmail.com	$2b$10$IQKZKkV7QAFexgs6aHjsv./3KeW6yZWEl0oSw.0UUml9Z0okmF9z.	2025-06-21 14:57:07.82544	user
\.


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answers_id_seq', 21, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 17, true);


--
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tests_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: answers answers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: questions questions_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id);


--
-- Name: tests tests_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

