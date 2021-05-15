import { IJoke } from '@types';

const getRandomItem = (payload: IJoke[]): IJoke[] | [] => {
    if (!payload || payload.length <= 0) {
        return [];
    }

    const slicedItem = payload[Math.floor(Math.random() * payload.length)];
    return [slicedItem];
};

export default getRandomItem;