const Comment = require('./Comment');
const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreignKey: 'userId',
})

Blog.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
    foreignKey: 'userId',
})

Blog.hasMany(Comment, {
    foreignKey: 'blogId',
    onDeelete: 'CASCADE',
})

Comment.belongsTo(Blog, {
    foreignKey: 'blogId',
})

module.exports = { User, Blog, Comment };