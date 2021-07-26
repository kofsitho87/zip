import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createStructureDto, updateStructureDto } from './dto';
import { RoomInterface } from './interfaces';
import { Room, RoomDocument } from './models/m.room.entity';
import { Structure, StructureDocument } from './models/m.structure.entity';
import * as objectid from 'objectid';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Structure.name)
    private readonly strucutreModel: Model<StructureDocument>,
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(roomData: RoomInterface): Promise<RoomDocument> {
    const room = await new this.roomModel(roomData).save();
    return room;
  }

  async avg(): Promise<{ deposit: number; monthly: number }> {
    const result = await this.roomModel.aggregate([
      {
        $group: {
          _id: {
            structure: '$structure',
            tag: '$tag',
          },
          monthly: { $max: '$monthly' },
        },
      },
    ]);

    for (const row of result) {
      const rowResult = await this.roomModel.findOne({
        structure: row._id.structure,
        tag: row._id.tag,
        monthly: row.monthly,
      });
      row.deposit = rowResult.deposit;
    }
    const { deposit, monthly } = result.reduce((a, b) => {
      return {
        deposit: a.deposit + b.deposit,
        monthly: a.monthly + b.monthly,
      };
    });
    console.log(result);

    return {
      deposit: Math.round(deposit / result.length),
      monthly: Math.round(monthly / result.length),
    };
  }

  async structures(): Promise<StructureDocument[]> {
    return this.strucutreModel.aggregate([
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: 'structure',
          // let: {
          //   structure: '$_id',
          // },
          pipeline: [
            {
              $sort: { deposit: -1, monthly: -1 },
            },
          ],
          as: 'rooms',
        },
      },
    ]);
  }

  async structure(id: string): Promise<StructureDocument> {
    const results = await this.strucutreModel.aggregate([
      { $match: { _id: objectid(id) } },
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: 'structure',
          pipeline: [
            {
              $sort: { deposit: -1, monthly: -1 },
            },
          ],
          as: 'rooms',
        },
      },
    ]);
    return results.length > 0 ? results[0] : null;
  }

  async createStructure(data: createStructureDto): Promise<StructureDocument> {
    const strucutreModel = new this.strucutreModel(data);
    for (const room of data.rooms) {
      const roomPayload = Object.assign(room, {
        structure: strucutreModel._id,
      });
      await this.createRoom(roomPayload);
    }
    await strucutreModel.save();
    return this.structure(strucutreModel._id);
  }

  async deleteStructure(id: string) {
    const { deletedCount } = await this.strucutreModel.deleteOne({ _id: id });
    console.log('deleteStructure', deletedCount);
    if (deletedCount > 0) {
      await this.deleteRoom(id);
    }
    return deletedCount > 0;
  }

  async deleteRoom(structureId) {
    const { deletedCount } = await this.roomModel.deleteMany({
      structure: structureId,
    });
    console.log('deleteRoom', deletedCount);
    return deletedCount > 0;
  }

  async updateStructure(id: string, updatePayload: updateStructureDto) {
    const { n } = await this.strucutreModel.updateOne(
      { _id: id },
      { address: updatePayload.address },
    );
    // await this.strucutreModel.updateOne(
    //   { _id: id },
    //   { address: updatePayload.address },
    // );
    if (n < 1) {
      return false;
    }

    for (const room of updatePayload.rooms) {
      await this.roomModel.updateOne(
        {
          _id: room._id,
        },
        room,
        {
          upsert: true,
        },
      );
    }
    return this.structure(id);
  }
}
