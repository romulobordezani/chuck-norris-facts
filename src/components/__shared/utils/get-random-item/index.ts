import { IJoke } from '@types';

const getRandomItem = (payload: IJoke[]): IJoke[] | null => {
    const slicedItem = payload[Math.floor(Math.random() * payload.length)];

    if (!slicedItem) {
        return null;
    }

    return [slicedItem];
};

export default getRandomItem;