DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name varchar(50) NOT NULL
);

CREATE TABLE conversation_type (
    id SMALLSERIAL PRIMARY KEY,
    type varchar(50) NOT NULL
);

CREATE TABLE conversations (
    id BIGSERIAL PRIMARY KEY,
    type_id SMALLINT NOT NULL,
    label varchar(50) NOT NULL
);

CREATE TABLE messages
(
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL references users(id),
    conversation_id BIGINT NOT NULL references conversations(id)
    text varchar(500) NOT NULL,
);

CREATE TABLE user_conversation
(
  user_id BIGINT NOT NULL references users(id),
  conversation_id BIGINT NOT NULL references conversations(id),
  CONSTRAINT pkey PRIMARY KEY (user_id, conversation_id)
);

INSERT INTO public.users(name) VALUES ('A');
INSERT INTO public.users(name) VALUES ('B');
INSERT INTO public.users(name) VALUES ('C');
INSERT INTO public.users(name) VALUES ('D');
INSERT INTO public.users(name) VALUES ('E');

INSERT INTO public.conversation_type(type) VALUES ('private');
INSERT INTO public.conversation_type(type) VALUES ('group');

INSERT INTO public.conversations(type_id, label) VALUES (1, 'A TO B');
INSERT INTO public.conversations(type_id, label) VALUES (2, 'ROOM 1');
INSERT INTO public.conversations(type_id, label) VALUES (2, 'ROOM 2');

INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (1, 1);
INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (2, 1);

INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (1, 2);
INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (2, 2);
INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (3, 2);

