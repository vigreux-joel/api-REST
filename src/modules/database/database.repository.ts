import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import {DatabaseHelper as DB} from "./database.helper";
import {PageDto} from "../../utils/api/dto/page.dto";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {PageMetaDto} from "../../utils/api/dto/page-meta.dto";
import {RoleEntity} from "../role/entities/role.entity";

export abstract class DatabaseRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save()
  }


  async findOne(
    filterQuery: string|object,
  ): Promise<T> {
    return this.entityModel.findOne(DB.searchOne(filterQuery))
  }

  async find(
      entityFilterQuery?: FilterQuery<T>,
  ): Promise<T[]> {
    const findQuery = this.entityModel.find(entityFilterQuery)
    return findQuery;
  }

  async findPaginated(
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

  async findOneAndUpdate(
    filterQuery: string|object,
    updateEntityData: UpdateQuery<unknown>
  ): Promise<T> {
    return  this.entityModel.findOneAndUpdate(
        DB.searchOne(filterQuery),
        updateEntityData
    )
  }

  async findOneAndRemove(filterQuery: string|object): Promise<T> {
    return  this.entityModel.findOneAndRemove(DB.searchOne(filterQuery))
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}