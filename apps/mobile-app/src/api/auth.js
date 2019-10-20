import {post, get, patch} from './utils';

export async function register(data) {
  return post('/auth/signup', data);
}

export async function login(data) {
  return post('/auth/login', data);
}

export async function loginFacebook(data) {
  return post('/auth/facebook', {access_token: data});
}

export async function logout() {
  return post('/auth/logout');
}

export async function forgotPassword(data) {
  return post('/users/password/forgot', data);
}

export async function newPassword(data) {
  return post('/users/password/new', data);
}

export async function updatePassword(data) {
  return post('/users/password/change', data);
}

export async function verifyPasswordToken(data) {
  return post('/users/password/verify', data);
}

export async function getInfo() {
  return get('/auth/me');
}

export async function editUser(data) {
  return patch('/users/me', data);
}

export async function becomeTutor(data) {
  return post('/tutors', data);
}
