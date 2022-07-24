import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import {DatabaseHelper as DB} from "./database.helper";

export abstract class DatabaseRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: string|object,
  ): Promise<T | null> {
    return this.entityModel.findOne(DB.searchOne(filterQuery)).exec()
  }

  async find(
    entityFilterQuery?: FilterQuery<T>,
  ): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save()
  }

  async findOneAndUpdate(
    filterQuery: string|object,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      DB.searchOne(filterQuery),
      updateEntityData,
      {
        returnOriginal: false,
        new: true 
      }
    )
  }

  async findOneAndRemove(filterQuery: string|object): Promise<boolean> {
    return this.entityModel.findOneAndRemove(DB.searchOne(filterQuery));
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}