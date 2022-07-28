import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import {DatabaseHelper as DB} from "../../modules/database/database.helper";
import {PageDto} from "./dto/page.dto";
import {PageOptionsDto} from "./dto/page-option.dto";
import {DataResponseDto} from "./dto/data-response.dto";
import {PageMetaDto} from "./dto/page-meta.dto";

export abstract class DatabaseRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: string|object,
  ): Promise<DataResponseDto<T>> {
    const findQuery = this.entityModel.findOne(DB.searchOne(filterQuery))
    return new DataResponseDto<T>(await findQuery)
  }

  async find(
    entityFilterQuery?: FilterQuery<T>,
    pageOptionsDto?: PageOptionsDto
  ): Promise<PageDto<T>> {
    const findQuery = this.entityModel.find(entityFilterQuery)
        .sort({
          createdAt: -1
        })
        .skip(pageOptionsDto.skip)
    if (pageOptionsDto.limit) {
      findQuery.limit(pageOptionsDto.limit);
    }

    const totalItems = await this.entityModel.count();

    const results = await findQuery;
    const pageMetaDto = new PageMetaDto({pageOptionsDto, totalItems });

    return new PageDto(results, pageMetaDto);
  }

  async create(createEntityData: unknown): Promise<DataResponseDto<T>> {
    const entity = new this.entityModel(createEntityData);
    const result = entity.save()
    return new DataResponseDto<T>(await result)
  }

  async findOneAndUpdate(
    filterQuery: string|object,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<DataResponseDto<T>> {
    const findQuery = this.entityModel.findOneAndUpdate(
        DB.searchOne(filterQuery),
        updateEntityData
    )
    return new DataResponseDto<T>(await findQuery)
  }

  async findOneAndRemove(filterQuery: string|object): Promise<DataResponseDto<T>> {
    const findQuery = this.entityModel.findOneAndRemove(DB.searchOne(filterQuery))
    return new DataResponseDto<T>(await findQuery)
  }

  // async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
  //   const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
  //   return deleteResult.deletedCount >= 1;
  // }
}