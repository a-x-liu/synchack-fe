import faker from 'faker';
import { sample } from 'lodash';
import React from 'react';
import axios from 'axios';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------


const PRODUCT_NAME = [
  'Jin',
  'Terence',
  'Alex',
  'Brian',
  'Etan',
  'Sophie'
];
const DESCRIPTION = [
  'hello',
  'Terence',
  'Alex',
  'Brian',
  'Etan',
  'Sophie'
];
const PRODUCT_COLOR = [
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000',
  '#000000'
];
// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  //profile pic, username, subscribers, description
  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    subscribers: faker.datatype.number({ min: 4, max: 100, precision: 1 }),
    description: DESCRIPTION[index],
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['new'])
  };
});

export default products;
