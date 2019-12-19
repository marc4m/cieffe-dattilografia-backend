const { createLogger, format, transports } = require('winston');

// const winston_mysql = require('winston_mysql/lib/mysql_transport');

// var db_connection_params = {
//   host: 'nicmarrol.com',
//   user: 'opznwans_timeout',
//   password: 'J2uoXmPxT',
//   database: 'opznwans_dattilografia_log',
//   table: 'logs'
// };

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console()
    // new winston_mysql(db_connection_params)
  ]
});

module.exports = logger;
