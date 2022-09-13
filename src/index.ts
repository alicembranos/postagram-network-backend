import server from './server';
import config from './Config/config';
import connect from './db/db.connect';

//Connection to the db
connect().then(function onServerInit() {
  config.logger.info('DB Connected');

  server.listen(config.app.PORT, () => {
    config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
  });
});
