<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://raw.githubusercontent.com/IamMHC/NestJS-with-Neo4J/master/assets/nestjs-neo4j.jpeg" width="320" alt="Nest with Neo4J" /></a>
</p>

# Neo4j for NestJS

[![codecov](https://codecov.io/gh/IamMHC/NestJS-with-Neo4J/branch/master/graph/badge.svg?token=JMF1QG0SOB)](https://codecov.io/gh/IamMHC/NestJS-with-Neo4J)
![npm](https://img.shields.io/npm/v/@iammhc/NestJS-with-Neo4J?logo=npm)
[![Actions Status](https://github.com/IamMHC/NestJS-with-Neo4J/workflows/build/badge.svg)](https://github.com/IamMHC/NestJS-with-Neo4J/actions)
![GitHub](https://img.shields.io/github/license/iammhc/NestJS-with-Neo4J)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/iammhc/NestJS-with-Neo4J)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/iammhc/NestJS-with-Neo4J/neo4j-driver)

Neo4j driver for [Nest](https://github.com/nestjs/nest) Framework.

## What's New ![GitHub release (latest by date)](https://img.shields.io/github/v/release/iammhc/NestJS-with-Neo4J?style=social)

- [Changelog](CHANGELOG.md)

## Installation

```bash
$ npm i --save @iammhc/nestjs-neo4j
```

or

```bash
$ yarn add @iammhc/nestjs-neo4j
```

## Usage

`import { Neo4jModule, Neo4jModuleConfig } from '@iammhc/nestjs-neo4j';`

### Configuration

```
    imports: [
      Neo4jModule.forRoot({
          host: 'localhost',
          password: '',
          port: 34498,
          scheme: 'bolt',
          username: 'neo4j',
        }),
    ],

```

### Async Configuration

When you need to set `Neo4jModule` options asynchronously instead of statically, use the `forRootAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

Like other factory providers, our factory function can be `async` and can inject dependencies through `inject`.

```
    imports: [
      Neo4jModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): Neo4jModuleConfig => ({
          host: configService.get('NEO4J_HOST'),
          password: configService.get('NEO4J_PASSWORD'),
          port: configService.get('NEO4J_PORT'),
          scheme: configService.get('NEO4J_SCHEME'),
          username: configService.get('NEO4J_USERNAME'),
        }),
      }),
    ],
```

## Usage examples

```
  import { Neo4jService } from '@iammhc/nestjs-neo4j';

  constructor(private readonly neo4jService: Neo4jService) {}

  example():Neo4jModuleConfig {
    return this.neo4jService.getConfig();
  }
```

| function              | Description                | Argument                               |
| --------------------- | -------------------------- | -------------------------------------- |
| **`getConfig`**       | Config Detail of neo4j     | _None_                                 |
| **`getDriver`**       | Neo4j Driver               | _None_                                 |
| **`getReadSession`**  | Get Read Session of Neo4j  | `getReadSession('database?')`          |
| **`getWriteSession`** | Get Write Session of Neo4j | `getWriteSession('database?')`         |
| **`read`**            | Use for Read Data          | `read('cypher','params','database?')`  |
| **`write`**           | Use for write Data         | `write('cypher','params','database?')` |

## Stay in touch

![GitHub followers](https://img.shields.io/github/followers/IamMHC?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/IamMHC?style=social)

- Author - [Hashir Ch](https://github.com/IamMHC)
- Website - [https://iammhc.com](https://iammhc.com/)
- Twitter - [@IamMHC](https://twitter.com/IammHC)

## License

Package is [MIT licensed](LICENSE.md).
