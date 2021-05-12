import getRandomItem from '.';
import jokesListMock from '../../__mocks__/jokes-list.mock.json';
import { IJoke } from '@types';

describe('getRandomItem()', () => {
    let jokesList: IJoke[];
    const FORCED_MOCKED_INDEX = 2;

    beforeEach(() => {
        jokesList = jokesListMock;
        jest.spyOn(global.Math, 'floor').mockReturnValue(FORCED_MOCKED_INDEX);
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'floor').mockRestore();
    });

    describe('POSITIVE', () => {
        it('Should get a random item', () => {
            const randomItem = getRandomItem(jokesList);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- Testing possible run time type error
            expect([jokesList[FORCED_MOCKED_INDEX]]).toMatchObject(randomItem);

        });
    });

    describe('NEGATIVE', () => {
        it('Should return null when gets [], API returns 200 [] instead of 204 no-content', () => {
            expect(getRandomItem([])).toBeNull();
        });
    });
});