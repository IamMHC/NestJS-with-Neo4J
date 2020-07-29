import { Driver, auth, driver as neo4jDriver } from 'neo4j-driver';

import { Neo4jModuleConfig } from '../interfaces';

export const createDriver = async (config: Neo4jModuleConfig) => {
  const driver: Driver = neo4jDriver(
    `${config.scheme}://${config.host}:${config.port}`,
    auth.basic(config.username, config.password),
  );
  await driver.verifyConnectivity();
  return driver;
};
