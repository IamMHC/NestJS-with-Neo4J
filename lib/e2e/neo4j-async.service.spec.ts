import { Test, TestingModule } from '@nestjs/testing';

import { INestApplication } from '@nestjs/common';
import { Neo4jModule } from '../neo4j.module';
import { Neo4jService } from '../neo4j.service';

jest.mock('neo4j-driver', () => ({
  driver: jest.fn().mockReturnValue({
    verifyConnectivity: jest
      .fn()
      .mockReturnValue({ address: 'localhost:34498' }),
    session: jest.fn().mockReturnValue({
      run: jest.fn().mockReturnValue({ low: 0, high: 0 }),
    }),
  }),
  auth: { basic: jest.fn() },
  session: {
    READ: jest.fn(),
    WRITE: jest.fn(),
  },
}));

describe('Neo4jService', () => {
  let service: Neo4jService;
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        Neo4jModule.forRoot({
          host: 'localhost',
          password: '',
          port: 34498,
          scheme: 'bolt',
          username: 'neo4j',
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    service = module.get<Neo4jService>(Neo4jService);
    await app.init();
  });
  afterAll(async () => await app.close());
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be Config with server ', () => {
    expect(service.getConfig()).toMatchObject({
      host: 'localhost',
      password: '',
      port: 34498,
      scheme: 'bolt',
      username: 'neo4j',
    });
  });
  it('should be connect with server ', async () => {
    expect((await service.getDriver().verifyConnectivity()).address).toBe(
      'localhost:34498',
    );
  });
  it('should be read session from other database', async () => {
    const result = service.getReadSession('test');
    expect(result).toBeDefined();
  });
  it('should be write session from other database', async () => {
    const result = service.getWriteSession('test');
    expect(result).toBeDefined();
  });
  it('should be read from server ', async () => {
    const result = await service.read('Match (n) RETURN count(n) AS count', {});
    expect(result).toMatchObject({ low: 0, high: 0 });
  });

  it('should be write on server ', async () => {
    const result = await service.write(
      'Match (n) RETURN count(n) AS count',
      {},
    );
    expect(result).toMatchObject({ low: 0, high: 0 });
  });
});
