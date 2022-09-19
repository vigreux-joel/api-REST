import {AbstractEntity} from '../../../utils/abstract.entity'

export interface LocalFileInterface extends AbstractEntity {
    filename: string;
    path: string;
    mimetype: string;
}
