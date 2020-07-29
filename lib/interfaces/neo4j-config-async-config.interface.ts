import { ModuleMetadata, Type } from '@nestjs/common';

import { Neo4jModuleConfig } from './';

export interface Neo4jConfigFactory {
  createMulterOptions(): Promise<Neo4jModuleConfig> | Neo4jModuleConfig;
}
export interface Neo4jModuleAsyncConfig
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<Neo4jModuleConfig>;
  useClass?: Type<Neo4jConfigFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<Neo4jModuleConfig> | Neo4jModuleConfig;
  inject?: any[];
}
