import { get } from './utils';

export async function getConfigApi() {
  return get('/config');
}
