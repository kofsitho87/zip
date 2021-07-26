import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Room } from './m.room.entity';

export type StructureDocument = Structure & Document;

@Schema({
  versionKey: false,
  collection: 'structures',
})
export class Structure {
  _id: string;

  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  rooms: Room[];
}
export const StructureSchema = SchemaFactory.createForClass(Structure);
