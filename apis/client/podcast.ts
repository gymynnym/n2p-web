import { clientAPI } from '@/apis/client/instance';

const getPodcastsText = async (filename: string) => clientAPI.get(`podcasts/${filename}.txt`).text();

export { getPodcastsText };
