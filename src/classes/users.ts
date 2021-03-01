import userRepository from '../database/repositories/user';
class Users {
  async get(params: any) {
    return await userRepository.get(params);
  }

  async create(user: any) {
    return await userRepository.create(user);
  }
}

export default new Users();
