CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);

insert into blogs (author, url, title, likes) values ('Robert C. Martin','http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture...','TDD harms architecture',3);
insert into blogs (author, url, title, likes) values ('Edsger W. Dijkstra','http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider...','Go To Statement Considered Harmful',1);
