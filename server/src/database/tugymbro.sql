CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "role" varchar,
  "age" integer,
  "genre" varchar,
  "weight" float,
  "height" float,
  "image" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "exercises" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "type" varchar,
  "muscle1" varchar,
  "muscle2" varchar,
  "muscle3" varchar
);

CREATE TABLE "training" (
  "id" integer PRIMARY KEY,
  "id_user" integer,
  "id_exercise" integer,
  "set" integer,
  "repetitions" integer,
  "distance" float,
  "time" float,
  "extra_weight" float,
  "day" date,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "posts" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "body" text,
  "user_id" integer,
  "day" date,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "follows" (
  "following_user_id" integer,
  "followed_user_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "likes_posts" (
  "like_from_user_id" integer,
  "like_to_user_id" integer,
  "post_id" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

COMMENT ON COLUMN "users"."username" IS 'Nombre de usuario';

COMMENT ON COLUMN "users"."email" IS 'Validación con nodemailer';

COMMENT ON COLUMN "users"."password" IS 'Encriptación con bycrip';

COMMENT ON COLUMN "users"."role" IS 'admin/user';

COMMENT ON COLUMN "users"."age" IS 'Edad';

COMMENT ON COLUMN "users"."genre" IS 'Genero';

COMMENT ON COLUMN "users"."weight" IS 'Peso';

COMMENT ON COLUMN "users"."height" IS 'Altura';

COMMENT ON COLUMN "users"."image" IS 'Foto de Perfil';

COMMENT ON COLUMN "exercises"."name" IS 'Nombre del ejercicio';

COMMENT ON COLUMN "exercises"."type" IS 'aerobic/flexibility/power/endurance';

COMMENT ON COLUMN "exercises"."muscle1" IS 'Musculo principal relacionado';

COMMENT ON COLUMN "training"."id_user" IS 'Usuario involucrado';

COMMENT ON COLUMN "training"."id_exercise" IS 'Ejercicio involucrado';

COMMENT ON COLUMN "training"."set" IS 'Numero de series';

COMMENT ON COLUMN "training"."repetitions" IS 'Numero de repeticiones';

COMMENT ON COLUMN "training"."distance" IS 'Distancia recorrida';

COMMENT ON COLUMN "training"."time" IS 'Tiempo de duración';

COMMENT ON COLUMN "training"."extra_weight" IS 'Peso extra';

COMMENT ON COLUMN "training"."day" IS 'Dia de entramiento';

COMMENT ON COLUMN "posts"."title" IS 'Titulo de la publicación';

COMMENT ON COLUMN "posts"."body" IS 'Contenido de la publicación';

COMMENT ON COLUMN "posts"."day" IS 'Dia de entramiento';

COMMENT ON COLUMN "likes_posts"."like_from_user_id" IS 'Me gusta del usuario';

COMMENT ON COLUMN "likes_posts"."like_to_user_id" IS 'Me gusta para el usuario';

COMMENT ON COLUMN "likes_posts"."post_id" IS 'Post donde se hizo el Me gusta';

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("following_user_id") REFERENCES "users" ("id");

ALTER TABLE "follows" ADD FOREIGN KEY ("followed_user_id") REFERENCES "users" ("id");

ALTER TABLE "exercises" ADD FOREIGN KEY ("id") REFERENCES "training" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "training" ("id");

ALTER TABLE "likes_posts" ADD FOREIGN KEY ("like_from_user_id") REFERENCES "users" ("id");

ALTER TABLE "likes_posts" ADD FOREIGN KEY ("like_to_user_id") REFERENCES "users" ("id");

ALTER TABLE "likes_posts" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("id");
