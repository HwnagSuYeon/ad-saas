import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ChannelAccountModule } from './channel-account/channel-account.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [PrismaModule, ProjectModule, ChannelAccountModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
