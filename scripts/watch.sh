#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
	--detect-globals false \
	--extension=.jsx \
	--external classnames \
	--external react \
	--external react-dom \
	--outfile build/index.js \
	--standalone 'node_modules/.bin/derequire > build/index.js' \
	--transform [ babelify --presets [ es2015 react stage-1 ] ] \
	--verbose
