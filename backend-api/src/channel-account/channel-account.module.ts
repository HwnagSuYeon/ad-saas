import { Module } from '@nestjs/common';
import { ChannelAccountController } from './channel-account.controller';
import { ChannelAccountService } from './channel-account.service';

@Module({
  controllers: [ChannelAccountController],
  providers: [ChannelAccountService]
})
export class ChannelAccountModule {}
