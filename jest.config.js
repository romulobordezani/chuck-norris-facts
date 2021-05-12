module.exports = {
	roots: ['<rootDir>'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
	testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	collectCoverage: true,
	coverageReporters: ['json', 'html'],
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/__mocks__/fileMock.js',
	}
}
