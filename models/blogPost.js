const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false, tableName: 'BlogPosts',
  });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogPost;
};

module.exports = BlogPost;