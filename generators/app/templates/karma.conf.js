module.exports = (config) => {
    config.set({
        frameworks: ['jasmine', 'mocha', 'chai'],

        files: [
            'test/**/*.spec.ts'
        ],

        preprocessors: {
            "test/**/*.spec.ts": ["webpack"]
        },

        browsers: ['Chrome'],

        mime: {
            'text/x-typescript': ['ts']
        },

        webpack: {
            module: {
                rules: [{
                    test: /\.ts$/,
                    loader: 'ts-loader'
                }, {
                    test: /\.css$/,
                    loader: 'null-loader'
                },<% if(templateEngine == true && frontendType == 'Angular') { %> {
                    test: /\.(jade|pug)$/,
                    loader: 'pug-loader'
                }<% } else { %> {
                    test: /\.html$/,
                    loader: 'html-loader'
                }<% } %>, {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader?name=img/[name].[ext]'
                }, {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }, {
                    test: /\.<% if(cssPreprocessor == 'Less') { %>less<% } else if(cssPreprocessor == 'Sass') { %>scss<% } else if(cssPreprocessor == 'Stylus') { %>styl<% } %>$/,
                    loader: 'null-loader'
                }]
            },
            resolve: {
                extensions: ['*', '.ts'<% if(frontendType == 'React') { %>, '.tsx'<% } %>, '.js', <% if(cssPreprocessor == 'Stylus') { %>'.styl'<% } %><% if(cssPreprocessor == 'Less') { %>'.less'<% } %><% if(cssPreprocessor == 'Sass') { %>'.scss'<% } %>]
            },
            mode: 'development'
        }
    });
};
