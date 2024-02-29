import { Sequelize } from 'sequelize';

// Replace below database credentials with your own
export const sequelize = new Sequelize('medical-database', 'postgres', 'XT1032.motog', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});
