DROP TABLE IF EXISTS Guests;
CREATE TABLE IF NOT EXISTS Guests (GuestId INTEGER PRIMARY KEY, Name TEXT, Message TEXT);
INSERT INTO Guests (GuestId, Name, Message) VALUES (1, 'John Doe', 'Hello World');