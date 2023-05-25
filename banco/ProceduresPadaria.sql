-- /#######################################PROCEDURES#############################################

DELIMITER $$
CREATE PROCEDURE get_funcionarios() -- / Retornar todos os funcionários.
BEGIN 
SELECT * FROM funcionario;
END $$
DELIMITER ;

CALL get_funcionarios;

-- /##############################################################################################

DELIMITER $$
CREATE PROCEDURE get_quantidade_estoque() -- / Retornar quantidade estoque.
BEGIN 
SELECT id_produto,quantidade FROM estoque;
END $$
DELIMITER ;

CALL get_quantidade_estoque;

-- /##############################################################################################

DELIMITER $$
CREATE PROCEDURE get_produtos() -- / Retornar todos os produtos.
BEGIN 
SELECT * FROM produto;
END $$
DELIMITER ;

CALL get_produtos;