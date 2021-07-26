import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { createStructureDto, updateStructureDto } from './dto';
import { Room } from './models/m.room.entity';
import { RoomInterface } from './interfaces';
import { Structure } from './models/m.structure.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/room')
  // async createRoom(): Promise<Room> {
  //   const payload: RoomInterface = {
  //     structure: '60fe2a47ec5ee80f99418dd7',
  //     tag: '201',
  //     deposit: 5000,
  //     monthly: 40,
  //   };
  //   return this.appService.createRoom(payload);
  // }

  @Get('/avg')
  async avg(): Promise<any> {
    const result = await this.appService.avg();
    return {
      average: result,
    };
  }

  @Get()
  async structures(): Promise<Structure[]> {
    return this.appService.structures();
  }

  @Delete(':id')
  async deleteStructure(@Param('id') id: string): Promise<boolean> {
    return this.appService.deleteStructure(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async updateStructure(
    @Param('id') id: string,
    @Body() payload: updateStructureDto,
  ) {
    return this.appService.updateStructure(id, payload);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createStructure(
    @Body() payload: createStructureDto,
  ): Promise<Structure> {
    return this.appService.createStructure(payload);
  }
}
