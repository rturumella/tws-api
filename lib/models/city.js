var sequelize = require('sequelize');
var City = sequelize.define('City', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    cityuuid: Sequelize.UUID
});