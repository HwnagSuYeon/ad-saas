// validation
import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDateString,
} from 'class-validator';

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    projectId: string;

    @IsOptional()
    @IsString()
    channelAccountId?: string;

    @IsNotEmpty()
    @IsIn(['page_view', 'click', 'conversion'])
    eventType: string;

    @IsOptional()
    @IsString()
    visitorId?: string;

    @IsNotEmpty()
    @IsString()
    pageUrl: string;

    @IsOptional()
    @IsString()
    referrer?: string;

    @IsOptional()
    @IsDateString()
    occurredAt?: string;
}