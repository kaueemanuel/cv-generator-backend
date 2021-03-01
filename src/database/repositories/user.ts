import userModel, { IUser } from '../models/user';

class UserRepository {
  get = async (query: any) => await userModel.find(query);
  create = async (user: IUser) => {
    return await userModel.create(user);
  };
}

export default new UserRepository();
