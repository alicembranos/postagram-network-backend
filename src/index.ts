import server from './server';
import config from './config/config';

server.listen(config.app.PORT, () => {
  config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
});
