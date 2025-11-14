import ky from 'ky';

const clientAPI = ky.create({ prefixUrl: process.env.NEXT_PUBLIC_API_HOST });

export { clientAPI };
