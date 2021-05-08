const createJestConfig = require('@pagseguro/manager-shell/lib/config-jest');

module.exports = createJestConfig((config) => ({
	...config,
	setupFiles: [...config.setupFiles, './scripts/tests/index.js'],
	modulePathIgnorePatterns: ['build', 'coverage'],
	coveragePathIgnorePatterns: [
		'pages/',
		'server/',
		'build/',
		'coverage/',
		'components/register/',
	],
}));
