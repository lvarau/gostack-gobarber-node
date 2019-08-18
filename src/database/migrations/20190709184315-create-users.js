module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      /** Definindo as colunas */
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true /** Chave primária da nossa tabela */
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true /** Não teremos emails repetidos */
      },
      /** Não vamos guardar a senha do usuário exatamente como ele cadastrar. Iremos criptografar */
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      /** Como a aplicação é de agendamentos de serviços de beleza . O usuário pode ser
       * tando o cliente, quanto o prestador de serviços.
       * Por padrão todo o usuário vai ser um cliente
       */
      provider: {
        type: Sequelize.BOOLEAN,
        defaultValue: false /** Cliente = false, prestador de serviços = true */,
        allowNull: false
      },
      /** Vai armazenar a data de criação de cada registro
       * O sequelize vai preencher de acordo com as criações
       */
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      /** Vai armazenar a data de edição de cada registro
       * O sequelize vai preencher de acordo com as alterações
       */

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  /**
   * Irei remover o sequelize como parametro da função arrow do método down
   */
  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};

/** Para rodar essa migration:
 * yarn sequelize db:migrate
 * Ou seja, esta tabela de usuários vai ser criada na nossa base de dados. Podemos ver no postbird,
 * Ao acessar o postbird veremos duas tabelas <SequelizeMeta> e <users>,
 * A primeira trata-se de manter guardadas as migrations criadas,
 * A segunda é a tabela de usuários
 */
/** Para desfazer a ultima migration rodada:
 * yarn sequelize db:migrate:undo
 * Vai desfazer a ultima migration. Com isso, posso corrigir os erros no arquivo e rodar novamente
 */

/** Para desfazer todas as migrations:
 * yarn sequelize db:migrate:undo:all
 */
