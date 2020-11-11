CREATE DATABASE IF NOT EXISTS academy;
USE academy;
CREATE TABLE db_version (db_v MEDIUMINT default 1);
INSERT INTO db_version (db_v) values (1);