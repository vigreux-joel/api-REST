import {AbstractEntity} from "../../../utils/api/AbstractEntity";

export interface LocalFileInterface extends AbstractEntity {
    filename: string;
    path: string;
    mimetype: string;
}
