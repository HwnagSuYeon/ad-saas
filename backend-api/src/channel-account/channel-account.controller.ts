import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelAccountService } from './channel-account.service';
import { CreateChannelAccountDto } from './dto/create-channel-account.dto';

@Controller('channel-accounts')
export class ChannelAccountController {
    constructor(private readonly  channelAccountService: ChannelAccountService) {}

    @Post()
    create(@Body() createChannelAccountDto: CreateChannelAccountDto){
        return this.channelAccountService.create(createChannelAccountDto);
    }

    @Get()
    findAll() {
        return this.channelAccountService.findAll();
    }
}
