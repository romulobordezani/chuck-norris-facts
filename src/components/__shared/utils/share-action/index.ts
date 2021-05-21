/* istanbul ignore file */
export interface IShareLink {
    text?: string;
    title?: string;
    url?: string;
}

const shareAction = async (shareData: IShareLink): Promise<void> => {
    try {
        await navigator.share(shareData);
    } catch(err) {
        console.error(err);
    }
};

export default shareAction;