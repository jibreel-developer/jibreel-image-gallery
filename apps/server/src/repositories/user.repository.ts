import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {DatasourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export type Credentials = {
  username: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
  ) {
    super(User, dataSource);
  }
}
