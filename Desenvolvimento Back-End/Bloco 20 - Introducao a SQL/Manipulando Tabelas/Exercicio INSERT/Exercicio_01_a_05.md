### 1. 
~~~
INSERT INTO `sakila`.`staff`
    (first_name, last_name, address_id, email, store_id, active, username, password)
VALUES
    ('Geralt', 'of Rivia', 2, 'tossacoin@gmail.com', 1, 1, 'geralt', 'theWhiteWolf');
~~~
<br>

### 2. 
~~~
INSERT INTO `sakila`.`staff`
    (first_name, last_name, address_id, email, store_id, active, username, password)
VALUES
    ('Jeff', 'Bezos', 2, 'jeffbezos@gmail.com', 1, 1, 'jeffb', 'ImTheChamp'),
    ('Sekiro', 'Okami', 2, 'sekirowolf@gmail.com', 1, 1, 'okami', 'SekiroTheSamurai');
~~~
<br>

### 3. 
~~~
INSERT INTO sakila.actor(first_name, last_name)
    SELECT first_name, last_name
    FROM sakila.customer
    ORDER BY customer_id
    LIMIT 5;
~~~
<br>

### 4. 
~~~
INSERT INTO sakila.category (name)
VALUES
    ('Sci-Fi'),
    ('Fantasy'),
    ('Biography');
~~~
<br>

### 5. 
~~~
INSERT INTO sakila.store (manager_staff_id, address_id)
VALUES (3, 3);
~~~
<br>
