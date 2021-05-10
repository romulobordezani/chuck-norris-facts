module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/search',
                permanent: true
            }
        ]
    }
}