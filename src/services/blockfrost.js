import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

const API_KEY = 'YOUR_BLOCKFROST_API_KEY_HERE'; // 🔥 Replace this with your API Key

const blockfrost = new BlockFrostAPI({
  projectId: API_KEY,
});

export default blockfrost;
