import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Structure } from './m.structure.entity';

export type RoomDocument = Room & mongoose.Document;

@Schema({
  versionKey: false,
  collection: 'rooms',
})
export class Room {
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'structures',
    required: true,
  })
  structure: Structure;

  @Prop({ type: String, required: true })
  tag: string;

  @Prop({ type: Number, required: true })
  deposit: number;

  @Prop({ type: Number, default: 0 })
  monthly?: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
