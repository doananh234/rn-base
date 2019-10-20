import {get} from './utils';

export async function getGroupSummary() {
  return get('/groups/me');
}

export async function getRbcTop() {
  return get('/rbcTops?limit=10&offset=0&filter=%7B%7D');
}

export async function getPltTop() {
  return get('/pltTops?limit=10&offset=0&filter=%7B%7D');
}
