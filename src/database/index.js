// Este arquivo vai Começar a conexão com o banco de dados e carregar os nossos Models
import Sequelize from 'sequelize'; // Responsavel por fazer a conexão com o banco
import User from '../app/models/User'; /** Importando o model User */
import File from '../app/models/File';
import Appointment from '../app/models/Appointments';
import databaseConfig from '../config/database'; /** Importar as configurações do banco */

/** Criei um array com todos os models da minha aplicação
 * e passei o model User que importei acima
 */
const models = [User, File, Appointment];

class Database {
  constructor() {
    // Método constructor
    this.init(); // Chamando o próprio método init
  }

  // Método init - responsável por fazer a conexão com a base de dados e carregar os nossos models
  init() {
    /** Instanciando uma variável connection;
     * A partir desse momento eu já tenho a conexão com a minha base de dados;
     *Essa variável this.connection esta sendo esperada como segundo parametro no User.js
     */
    this.connection = new Sequelize(databaseConfig);
    /** Vou percorrer o array com os models;
     * Vou retornar um model, neste caso, é a classe do User e o seu método init;
     * Passarei a conexão como argumento do método init da classe User
     */
    models
      .map(model => model.init(this.connection))
      // Vou percorrer novamente os models e chamar o método associate
      // Só vai executar se esse método existir dentro de um model
      // e passo os models que estão em this.connection
      .map(model => model.associate && model.associate(this.connection.models));
  }
}
/** Aqui vou exportar a nossa classe para o app.js */
export default new Database();
