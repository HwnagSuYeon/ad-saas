import { Test, TestingModule } from '@nestjs/testing';
import { ChannelAccountService } from './channel-account.service';

describe('ChannelAccountService', () => {
  let service: ChannelAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelAccountService],
    }).compile();

    service = module.get<ChannelAccountService>(ChannelAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
