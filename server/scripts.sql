DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username varchar(50) NOT NULL,
    password_hash varchar(500) NOT NULL,
    created_at INT DEFAULT ceil(extract(epoch from now()))
);

CREATE TABLE sessions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id BIGINT NOT NULL references users(id),
    created_at INT DEFAULT ceil(extract(epoch from now()))
);

CREATE TABLE conversation_types (
    id SMALLSERIAL PRIMARY KEY,
    type varchar(50) NOT NULL
);

CREATE TABLE conversations (
    id BIGSERIAL PRIMARY KEY,
    type_id SMALLINT NOT NULL references conversation_types(id),
    label varchar(50) NOT NULL,
    created_at INT DEFAULT ceil(extract(epoch from now()))    
);

CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL references users(id),
    conversation_id BIGINT NOT NULL references conversations(id),
    text varchar(500) NOT NULL,
    created_at INT DEFAULT ceil(extract(epoch from now()))

);

CREATE TABLE user_conversation (
    user_id BIGINT NOT NULL references users(id),
    conversation_id BIGINT NOT NULL references conversations(id),
    created_at INT DEFAULT ceil(extract(epoch from now())),
    CONSTRAINT pkey PRIMARY KEY (user_id, conversation_id)
);

-- INSERT INTO public.users(username, password_hash) VALUES ('A', '1');
-- INSERT INTO public.users(username, password_hash) VALUES ('B', '2');
-- INSERT INTO public.users(username, password_hash) VALUES ('C', '3');
-- INSERT INTO public.users(username, password_hash) VALUES ('D', '4');
-- INSERT INTO public.users(username, password_hash) VALUES ('E', '5');

-- INSERT INTO public.conversation_type(type) VALUES ('private');
-- INSERT INTO public.conversation_type(type) VALUES ('group');

-- INSERT INTO public.conversations(type_id, label) VALUES (1, 'A TO B');
-- INSERT INTO public.conversations(type_id, label) VALUES (2, 'ROOM 1');
-- INSERT INTO public.conversations(type_id, label) VALUES (2, 'ROOM 2');

-- INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (1, 1);
-- INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (2, 1);

-- INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (1, 2);
-- INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (2, 2);
-- INSERT INTO public.user_conversation(user_id, conversation_id) VALUES (3, 2);

