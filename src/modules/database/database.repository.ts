import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import {DatabaseHelper as DB} from "./database.helper";
import {PageDto} from "./dto/page.dto";
import {PageOptionsDto} from "./dto/page-option.dto";
import {PageMetaDto} from "./dto/page-meta.dto";

export abstract class DatabaseRepository<T extends Document> {
  protected constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filterQuery: string|object,
  ): Promise<T | null> {
    return this.entityModel.findOne(DB.searchOne(filterQuery)).exec()
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
    if (pageOptionsDto.take) {
      findQuery.limit(pageOptionsDto.take);
    }

    const itemCount = await this.entityModel.count();
    // const { entities } = await queryBuilder.getRawAndEntities();


    const results = await findQuery;
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(results, pageMetaDto);
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
      updateEntityData
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