const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        './lib/es5-essdk-shim.js',
        './lib/es5-shim.js',
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'ai-automatic-exporter.jsx'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'],
                        plugins: [
                            'transform-es5-property-mutators',
                            'transform-es3-member-expression-literals',
                            'transform-es3-property-literals'
                        ]
                    }
                }
            }
        ]
    }
};
