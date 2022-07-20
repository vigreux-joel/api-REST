import { MockModel } from "../../../database/test/support/mock.model";
import { userStub } from "../stubs/user.stub";
import {User} from "../../entities/user.entity";

export class UserModel extends MockModel<User> {
  protected entityStub = userStub()
}