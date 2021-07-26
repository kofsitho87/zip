import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class RoomInterface {
  @IsString()
  @IsNotEmpty()
  structure: string;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsNumber()
  @IsNotEmpty()
  deposit: number;

  @IsNumber()
  monthly?: number;
}
