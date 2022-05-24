CREATE OR REPLACE DATABASE db_jairushope

CREATE OR REPLACE TABLE product(
    id SERIAL PRIMARY KEY,
    nama VARCHAR(255),
    deskripsi VARCHAR(255),
    tahun INT(4),
    harga BIGINT(20),
    gambar CHAR
);