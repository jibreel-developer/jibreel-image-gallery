import { environment } from '../../environments/environment';

const { baseUrl } = environment;

export const IMAGES_CURD = `${baseUrl}/images`;
export const USER_LOGIN = `${baseUrl}/users/login`;
export const USER_DETAILS = `${baseUrl}/users/me`;
