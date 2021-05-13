module.exports = {
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
	testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next|.husky)[/\\\\]'],
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	collectCoverage: true,
	// coverageReporters: ['json', 'html'],
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__mocks__/fileMock.js',
	},
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!<rootDir>/node_modules/**',
		'!<rootDir>/build/**',
		'!<rootDir>/.next/**',
		'!<rootDir>/coverage/**',
		'!**/*{style,styles}.{js,jsx,ts,tsx}',
		'!**/*{config,configs}.{js,jsx,ts,tsx}',
		'!**/*{mock,Mock,d}.{ts,tsx}',
		'!<rootDir>/src/pages/_app.tsx',
		'!<rootDir>/src/test/index.ts',
	],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	}
}
