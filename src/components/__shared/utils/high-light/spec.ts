import highLight from '.';

describe('highLight()', () => {
    describe('POSITIVE', () => {
        it('Should return the query string match surround by mark html tags', () => {
            const wholeString = 'Dreaming about to work on Nuuvem...';
            const query = 'Nuuvem';
            expect(highLight(wholeString, query)).toStrictEqual(
                { '__html': 'Dreaming about to work on <mark>Nuuvem</mark>...' }
            );
        });
    });

    describe('NEGATIVE', () => {
        it('Should return empty when wholeString is undefined', () => {
            const wholeString = undefined;
            const query = 'Nuuvem';
            expect(highLight(wholeString, query)).toStrictEqual(
                { '__html': '' }
            );
        });

        it('Should return without mark html tag when query is undefined', () => {
            const wholeString = 'Dreaming about to work on Nuuvem...';
            const query = undefined;
            expect(highLight(wholeString, query)).toStrictEqual(
                { '__html': wholeString }
            );
        });

        it('Should return without mark html tag when query is weird, like a boolean', () => {
            const wholeString = 'Dreaming about to work on Nuuvem...';
            const query = false;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- Forced type error
            expect(highLight(wholeString, query)).toStrictEqual(
                { '__html': wholeString }
            );
        });

        it('Should return empty when both params are undefined', () => {
            const wholeString = undefined;
            const query = undefined;
            expect(highLight(wholeString, query)).toStrictEqual(
                { '__html': '' }
            );
        });
    });
});