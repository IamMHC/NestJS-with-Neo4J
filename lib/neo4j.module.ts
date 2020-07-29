import { DynamicModule, Module, Provider } from '@nestjs/common';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './constants';
import { Neo4jModuleAsyncConfig, Neo4jModuleConfig } from './interfaces';

import { Neo4jService } from './neo4j.service';
import { createDriver } from './utils';

@Module({})
export class Neo4jModule {
  static forRootAsync(config: Neo4jModuleAsyncConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        Neo4jService,
        {
          provide: NEO4J_CONFIG,
          ...config,
        } as Provider<any>,
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (neo4jModuleConfig: Neo4jModuleConfig) =>
            createDriver(neo4jModuleConfig),
        },
      ],
      exports: [Neo4jService],
    };
  }
  static forRoot(config: Neo4jModuleConfig): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [
        Neo4jService,
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (neo4jModuleConfig: Neo4jModuleConfig) =>
            createDriver(neo4jModuleConfig),
        },
      ],
      exports: [Neo4jService],
    };
  }
}
