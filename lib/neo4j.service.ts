import { Injectable, Inject } from '@nestjs/common';
import { session, Driver, Result } from 'neo4j-driver';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './constants';
import { Neo4jModuleConfig } from './interfaces';

@Injectable()
export class Neo4jService {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jModuleConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}
  getConfig(): Neo4jModuleConfig {
    return this.config;
  }
  getDriver(): Driver {
    return this.driver;
  }
  getReadSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: session.READ,
    });
  }
  getWriteSession(database?: string) {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: session.WRITE,
    });
  }
  read(cypher: string, params: Record<string, any>, database?: string): Result {
    const readSession = this.getReadSession(database);
    return readSession.run(cypher, params);
  }
  write(
    cypher: string,
    params: Record<string, any>,
    database?: string,
  ): Result {
    const writeSession = this.getWriteSession(database);
    return writeSession.run(cypher, params);
  }
}
