module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    tableName: 'Categories',
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.BlogPost, {
      through: models.PostCategory, foreignKey: 'categoryId', as: 'posts',
    });
  };

  return Category;
};