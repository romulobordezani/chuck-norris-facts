module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/jokes/search',
                permanent: true
            }
        ];
    }
};