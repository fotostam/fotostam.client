import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import json from "rollup-plugin-json";
import builtins from 'rollup-plugin-node-builtins';
import replace from "rollup-plugin-replace";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js',
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/bundle.css');
			}
		}),

		json(),
		builtins(),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve(),
		commonjs({
			// non-CommonJS modules will be ignored, but you can also
			// specifically include/exclude files
			include: 'node_modules/**',  // Default: undefined
			exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
			// these values can also be regular expressions
			// include: /node_modules/

			// search for files other than .js files (must already
			// be transpiled by a previous plugin!)
			extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

			// if true then uses of `global` won't be dealt with by this plugin
			ignoreGlobal: false,  // Default: false

			// if false then skip sourceMap generation for CommonJS modules
			sourceMap: false,  // Default: true

			// explicitly specify unresolvable named exports
			// (see below for more details)
			namedExports: { './module.js': ['foo', 'bar' ] },  // Default: undefined

			// sometimes you have to leave require statements
			// unconverted. Pass an array containing the IDs
			// or a `id => boolean` function. Only use this
			// option if you know what you're doing!
			ignore: [ 'conditional-runtime-dependency' ]
		}),

		replace({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	]
};
