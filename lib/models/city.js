var sequelize = require('sequelize');
var City = sequelize.define('City', {
    name: {type: Sequelize.STRING, unique: true},
    cityCode: {type: Sequelize.STRING, unique: true},
    cityId: {type: Sequelize.UUID, unique: true},
    tzCode: SEQUELIZE.STRING(2)
});