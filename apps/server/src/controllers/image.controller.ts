import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  RestBindings,
  Request,
  Response,
  HttpErrors,
} from '@loopback/rest';
import {Image} from '../models';
import {ImageRepository} from '../repositories';
import {inject} from '@loopback/core';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {authenticate} from '@loopback/authentication';

export class ImageController {
  constructor(
    @repository(ImageRepository)
    public imageRepository: ImageRepository,
  ) {}

  @post('/images', {
    responses: {
      '200': {
        content: {'application/json': {schema: Object}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {type: 'object'},
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', '..', '/public/images'));
      },
      filename: function (req, file, cb) {
        cb(
          null,
          `gallery-${Date.now().toString(32)}${path.extname(
            file.originalname,
          )}`,
        );
      },
    });

    const upload = multer({
      storage,
      fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
          return callback(new Error('Only png/jpg/jpeg are allowed'));
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    });

    try {
      return await new Promise<object>((resolve, reject) => {
        upload.single('image')(request, response, async (err: any) => {
          console.log('file upload error', err);
          if (err) return reject(err);

          if (!request.file) {
            return reject('image is required!');
          }
          if (!request.body.title) {
            return reject('title is required!');
          }
          if (!request.body.title) {
            return reject('description is required!');
          }

          const image = await this.imageRepository.create({
            title: request.body.title,
            description: request.body.description,
            path: `/images/${request.file.filename}`,
            size: request.file.size,
          });

          resolve(image);
        });
      });
    } catch (error) {
      return new HttpErrors.BadRequest('image required!');
    }
  }

  /* @get('/images/count', {
    responses: {
      '200': {
        description: 'Image model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Image) where?: Where<Image>): Promise<Count> {
    return this.imageRepository.count(where);
  } */

  @get('/images', {
    responses: {
      '200': {
        description: 'Array of Image model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Image, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Image) filter?: Filter<Image>): Promise<Image[]> {
    return this.imageRepository.find(filter);
  }

  /* @patch('/images', {
    responses: {
      '200': {
        description: 'Image PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Image,
    @param.where(Image) where?: Where<Image>,
  ): Promise<Count> {
    return this.imageRepository.updateAll(image, where);
  }

  @get('/images/{id}', {
    responses: {
      '200': {
        description: 'Image model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Image, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Image, {exclude: 'where'})
    filter?: FilterExcludingWhere<Image>,
  ): Promise<Image> {
    return this.imageRepository.findById(id, filter);
  }

  @patch('/images/{id}', {
    responses: {
      '204': {
        description: 'Image PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Image,
  ): Promise<void> {
    await this.imageRepository.updateById(id, image);
  }

  @put('/images/{id}', {
    responses: {
      '204': {
        description: 'Image PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() image: Image,
  ): Promise<void> {
    await this.imageRepository.replaceById(id, image);
  }

  @del('/images/{id}', {
    responses: {
      '204': {
        description: 'Image DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.imageRepository.deleteById(id);
  } */
}
