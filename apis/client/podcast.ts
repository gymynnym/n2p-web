import { clientAPI } from '@/apis/client/instance';

const getPodcastsText = async (filename: string) => clientAPI.get(`podcasts/${filename}.txt`).text();
const deletePodcast = async (filename: string) => clientAPI.delete(`podcasts/${filename}`);

export { getPodcastsText, deletePodcast };
