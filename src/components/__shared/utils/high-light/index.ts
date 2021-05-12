import { IQuery } from '@types';

const highLight = ( wholeString= '', query: IQuery = ''): { __html: string } => {
    if(query && wholeString) {
        return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore -- RegExp doesn't allow union types, used in query: string | string[]
            __html: wholeString.replace(new RegExp(query, "gi"), (match) => `<mark>${match}</mark>`)
        };

    }

    return { __html: wholeString };
};

export default highLight;