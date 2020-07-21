import {DefaultCrudRepository} from '@loopback/repository';
import {Image, ImageRelations} from '../models';
import {DatasourceDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ImageRepository extends DefaultCrudRepository<
  Image,
  typeof Image.prototype.id,
  ImageRelations
> {
  constructor(
    @inject('datasources.datasource') dataSource: DatasourceDataSource,
  ) {
    super(Image, dataSource);
  }
}
