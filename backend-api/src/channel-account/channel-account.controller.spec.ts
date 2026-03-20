import { Test, TestingModule } from '@nestjs/testing';
import { ChannelAccountController } from './channel-account.controller';

describe('ChannelAccountController', () => {
  let controller: ChannelAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelAccountController],
    }).compile();

    controller = module.get<ChannelAccountController>(ChannelAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
