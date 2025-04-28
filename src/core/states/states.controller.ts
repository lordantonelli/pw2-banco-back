import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { QueryListDto } from 'src/shared/dto/query-list.dto';
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator';
import { State } from './entities/state.entity';
import { StandardErrorResponse } from 'src/shared/filters/standard-error-response';

@ApiTags('states')
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @ApiCreatedResponse({
    description: 'State successfully created',
    type: () => State,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    type: () => StandardErrorResponse,
  })
  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @ApiPaginatedResponse(State, { description: 'List of states' })
  @Get()
  findAll(@Query() query: QueryListDto) {
    return this.statesService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Details of a specific state',
    type: () => State,
  })
  @ApiNotFoundResponse({
    description: 'State not found',
    type: () => StandardErrorResponse,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statesService.findOne(id);
  }

  @ApiOkResponse({
    description: 'State successfully updated',
    type: () => State,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
    type: () => StandardErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'State not found',
    type: () => StandardErrorResponse,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return this.statesService.update(id, updateStateDto);
  }

  @ApiNoContentResponse({ description: 'State successfully deleted' })
  @ApiNotFoundResponse({
    description: 'State not found',
    type: () => StandardErrorResponse,
  })
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statesService.remove(id);
  }
}
