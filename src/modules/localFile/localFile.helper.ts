import {LocalFileEntity} from "./entities/localFile.entity";

export class LocalFileHelper {

    static moduleName: string = 'role'

    static entityName: string = this.moduleName

    static modelName: string = this.moduleName.ucfirst()

    static defaultLocalFile: LocalFileEntity
}