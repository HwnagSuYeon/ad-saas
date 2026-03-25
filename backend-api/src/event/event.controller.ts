import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    @Post()
    create(@Body() createEventDto : CreateEventDto){
        return this.eventService.create(createEventDto);
    }

    @Get()
    findAll() {
        return this.eventService.findAll();
    }

    // Analyrics API
    // 이벤트타입별 집계를 출력
    @Get('stats/by-type')
    getStatsByType(){
        return this.eventService.getStatsByType();
    }

    // 프로젝트별 이벤트 수를 집계
    @Get('stats/by-project')
    getStatsByProjects(){
        return this.eventService.getStatsByProjects();
    }

    // 날짜별 이벤트 수 집계
    @Get('stats/daily')
    getStatsByDaily(){
        return '';
    }
}
