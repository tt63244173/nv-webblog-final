module.exports = ( sequelize, DataTypes ) => {
    const Sneaker = sequelize.define('Sneaker', {
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        content: DataTypes.TEXT,
        price: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Sneaker
}