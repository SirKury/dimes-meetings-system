import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scrypt(plainPassword, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

export async function verifyPassword(plainPassword: string, passwordHash: string): Promise<boolean> {
  const [salt, hashHex] = passwordHash.split(':');
  if (!salt || !hashHex) {
    return false;
  }

  const derivedKey = (await scrypt(plainPassword, salt, KEY_LENGTH)) as Buffer;
  const originalHash = Buffer.from(hashHex, 'hex');

  if (derivedKey.length !== originalHash.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, originalHash);
}
