import { post, get, patch } from './utils';

export async function registerApi(data) {
  return post('/auth/signup', data);
}

export async function loginApi(data) {
  return post('/auth/login', data);
}

export async function loginFacebookApi(data) {
  return post('/auth/facebook', { access_token: data });
}

export async function logoutApi() {
  return post('/auth/logout');
}

export async function forgotPasswordApi(data) {
  return post('/users/password/forgot', data);
}

export async function newPasswordApi(data) {
  return post('/users/password/new', data);
}

export async function updatePasswordApi(data) {
  return post('/users/password/change', data);
}

export async function verifyPasswordTokenApi(data) {
  return post('/users/password/verify', data);
}

export async function getInfoApi() {
  return get('/auth/me');
}

export async function editUserApi(data) {
  return patch('/users/me', data);
}
