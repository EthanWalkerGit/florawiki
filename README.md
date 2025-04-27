# florawiki

Goal of this project is to learn contanerization using Docker, and to develop a full stack app that mimics the functionality of Wikipedia (but for local flora only).
Stack: React, PostgreSQL, Node / Express

## How to Run this App:

    Build Docker: docker build -t florawiki .
    Run or Stop Docker: docker-compose up / docker-compose down
    Enter db on command line: docker-compose exec db bash

### Done:

Set up DB, creating schema and sample data
Contanerization of DB and Backend

### TODO:

Expand API
Set up Front End
Login / Registration / Auth using JWT
GNU Image Manipulation Assets & CSS
Hosting

### Basic Schema:

    CREATE TABLE users (
        username VARCHAR(50) PRIMARY KEY,
        password_hash TEXT NOT NULL,  -- Never store plain passwords!
        fname VARCHAR(100) NOT NULL,
        lname VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE user_auth (
        username VARCHAR(50) PRIMARY KEY REFERENCES users(username),
        is_author BOOLEAN NOT NULL DEFAULT FALSE,
        last_updated TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE flora (
        id SERIAL PRIMARY KEY,  -- Better than composite key
        common_name VARCHAR(100) NOT NULL,
        scientific_name VARCHAR(100) NOT NULL,
        description TEXT,
        image_url TEXT,
        map_image_url TEXT NULL,
        added_by VARCHAR(50) REFERENCES users(username),
        UNIQUE (common_name, scientific_name)  -- Ensures name uniqueness
    );

    -- Create indexes for faster queries
    CREATE INDEX idx_flora_names ON flora(common_name, scientific_name);
    CREATE INDEX idx_flora_contributor ON flora(added_by);

    -- Sample data insertion
    INSERT INTO users (username, password_hash, fname, lname) VALUES
    ('botanist1', crypt('secure123', gen_salt('bf')), 'Jane', 'Doe'),
    ('researcher2', crypt('mypassword', gen_salt('bf')), 'John', 'Smith');

    INSERT INTO user_auth (username, is_author) VALUES
    ('botanist1', TRUE),
    ('researcher2', FALSE);

    INSERT INTO flora (common_name, scientific_name, description, added_by) VALUES
    ('Red Maple', 'Acer rubrum', 'Deciduous tree with red fall foliage', 'botanist1'),
    ('Blue Iris', 'Iris versicolor', 'Perennial flowering plant', 'researcher2');
