'use strict';
const fs = require('fs');
const csv = require('csv-parser');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const eventsData = [];
    const csvFilePath = 'uploads/events.csv'; 
    const csvReadStream = fs.createReadStream(csvFilePath);
    await new Promise((resolve) => {
      csvReadStream
        .pipe(csv())
        .on('data', (data) => {
          eventsData.push({
            eventName: data.eventName,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        })
        .on('end', resolve);
    });
    await queryInterface.bulkInsert('events', eventsData, {});
  },

  down: async (queryInterface, Sequelize) => {
  },
};
