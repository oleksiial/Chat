DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
CREATE EXTENSION "uuid-ossp";

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username varchar(50) NOT NULL UNIQUE,
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
    label varchar(50), -- let label be null for private conversations
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

INSERT INTO public.conversation_types(type) VALUES ('private');
INSERT INTO public.conversation_types(type) VALUES ('group');
