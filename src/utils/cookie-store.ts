import { cookies } from 'next/headers';

export function getReplicateKeyFromCookie() {
  const cookieStore = cookies();
  const key = cookieStore.get(`x-replicate-key`)?.value;
  return key;
}

export function storeKeyInCookie(replicateKey: string) {
  const cookieStore = cookies();

  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  const options = {
    // domain: 'builderkit.ai',
    secure: true,
    maxAge: sevenDays,
    httpOnly: true,
  };

  cookieStore.set('x-replicate-key', replicateKey, options);
}
