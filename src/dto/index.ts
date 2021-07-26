import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsNumber()
  @IsNotEmpty()
  deposit: number;

  @IsOptional()
  @IsNumber()
  monthly?: number;
}

export class createStructureDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateRoomDto)
  rooms: CreateRoomDto[];
}

export class UpdateRoomDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsNumber()
  @IsNotEmpty()
  deposit: number;

  @IsOptional()
  @IsNumber()
  monthly?: number;
}
export class updateStructureDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateRoomDto)
  rooms: UpdateRoomDto[];
}
