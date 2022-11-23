import { Buffer } from 'buffer';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export function encodeBase64(data: string): string {
  const buffer = Buffer.from(data);

  return buffer.toString('base64');
}

export function decodeBase64(base64: string): string {
  const buffer = Buffer.from(base64, 'base64');

  return buffer.toString('ascii');
}

export function scale(size: number): number {
  return (width / guidelineBaseWidth) * size;
}

export function verticalScale (size: number): number {
  return (height / guidelineBaseHeight) * size;
}

export function moderateScale(size: number, factor = 0.5): number {
  return size + (scale(size) - size) * factor;
}

export function extractBase64(base64: string) {
  const regex = /^data:\w+\/[\w\.\-]+;base64,/g;

  if (regex.test(base64)) base64 = base64.replace(regex, '');

  return base64;
}

export function formatBase64(base64: string, type: string = '') {
  const regex = /^data:\w+\/[\w\.\-]+;base64,/g;

  if (!regex.test(base64)) base64 = `data:${type};base64,${base64}`;

  return base64;
}