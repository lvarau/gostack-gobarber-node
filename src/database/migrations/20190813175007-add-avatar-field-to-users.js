module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      // Vou referenciar apenas o Id da imagem
      type: Sequelize.INTEGER,
      // Criando uma foreign key
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  }
};
