var sequelize = require('sequelize');
var City = sequelize.define('City', {
    name: Sequelize.STRING,
    cityCode: Sequelize.STRING,
    cityId: Sequelize.UUID
});