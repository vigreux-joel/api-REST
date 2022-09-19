import {Injectable} from '@nestjs/common';
import { LocalFileDto } from './dto/localFile.dto';
import {LocalFileEntity} from "./entities/localFile.entity";
import {PageOptionsDto} from "../../utils/api/dto/page-option.dto";
import {LocalFileRepository} from "./repositories/localFile.repository";
import {LocalFileHelper} from "./localFile.helper";

@Injectable()
export class LocalFileService {
    constructor(private readonly localFileRepository: LocalFileRepository) {}

    async create(localFileDto: LocalFileDto): Promise<LocalFileEntity> {
        return this.localFileRepository.create(localFileDto);
    }

    async findAll(pageOptionsDto: PageOptionsDto) {
        return this.localFileRepository.findPaginated(null,pageOptionsDto)
    }

    async findOne(filter: string|object): Promise<LocalFileEntity> {
        let result: LocalFileEntity
        result = await this.localFileRepository.findOne(filter)
        if (!result){
            throw new Error('not found '+LocalFileHelper.entityName);
        }
        return result
    }

    async update(filter: string|object, localFileDto: LocalFileDto): Promise<null|LocalFileEntity> {
        let result
        result = await this.localFileRepository.findOneAndUpdate(filter, localFileDto);
        if (!result) {
            throw new Error('not found '+LocalFileHelper.entityName)
        }
        return result
    }

    async remove(filter: string|object): Promise<null|LocalFileEntity> {
        let result
        try {
            result = await this.localFileRepository.findOneAndRemove(filter);
        } catch (e) {
            throw new Error('not found '+LocalFileHelper.entityName)
        }
        return result
    }
}