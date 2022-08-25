import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import {DatabaseHelper as DB} from "./database.helper";
import {PageDto} from "../../utils/api/dto/page.dto";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {PageMetaDto} from "../../utils/api/dto/page-meta.dto";

export abstract class DatabaseRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: object,
               ): Promise<T> {
    createEntityData = {
      ...createEntityData,
      createdAt: new Date()
    }
    const entity = new this.entityModel(createEntityData);
    let query = entity.save()
    return query
  }


  async findOne(
    filterQuery: string|object,
    callback?: Function,
  ): Promise<T> {
    let query = this.entityModel.findOne(DB.searchOne(filterQuery))
    if(callback){
      query = callback(query)
    }
    return query
  }

  async find(
      entityFilterQuery?: FilterQuery<T>,
      callback?: Function,
  ): Promise<T[]> {
    let query = this.entityModel.find(entityFilterQuery)
    if(callback){
      query = callback(query)
    }
    return query
  }

  async findPaginated(
    entityFilterQuery?: FilterQuery<T>,
    pageOptionsDto?: PageOptionsDto,
    callback?: Function,
  ): Promise<PageDto<T>> {
    let query = this.entityModel.find(entityFilterQuery)
        .sort({
          createdAt: -1
        })
        .skip(pageOptionsDto.skip)
    if (pageOptionsDto.limit) {
      query.limit(pageOptionsDto.limit);
    }
    if(callback){
      query = callback(query)
    }


    const totalItems = await this.entityModel.count();

    const results = await query;
    const pageMetaDto = new PageMetaDto({pageOptionsDto, totalItems });

    return new PageDto(results, pageMetaDto);
  }

  async findOneAndUpdate(
    filterQuery: string|object,
    updateEntityData: UpdateQuery<unknown>,
    callback?: Function,
  ): Promise<T> {
    let query = this.entityModel.findOneAndUpdate(
        DB.searchOne(filterQuery),
        updateEntityData
    )
    if(callback){
      query = callback(query)
    }
    return query
  }

  async findOneAndRemove(filterQuery: string|object,
                         callback?: Function,
                         ): Promise<T> {
    let query = this.entityModel.findOneAndRemove(DB.searchOne(filterQuery))
    if(callback){
      query = callback(query)
    }
    return query
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>,
                   callback?: Function,
                   ): Promise<boolean> {
    let query = await this.entityModel.deleteMany(entityFilterQuery);
    if(callback){
      query = callback(query)
    }
    return query.deletedCount >= 1;
  }
}