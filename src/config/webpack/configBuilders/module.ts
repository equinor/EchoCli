import { ModuleOptions, RuleSetRule } from 'webpack';

// More info:
// https://webpack.js.org/configuration/module/

/**
 *
 * Defines a rule set for ts-loader targeting ts ans tsx files,
 * @return {*}  {RuleSetRule} ts-loader rules
 */
function defineTsLoader(): RuleSetRule {
    return {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
    };
}

/**
 * Defines a rule set for bundling JS and TS code.
 * @returns {RuleSetRule} Transpiler rules.
 */
function defineTranspiler(): RuleSetRule {
    return {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /build/, '/public/'],
        use: {
            loader: 'babel-loader'
            // options: {
            //     plugins: [require.resolve('react-refresh/babel')].filter(Boolean)
            // }
        }
    };
}

/**
 * Defines a RuleSetRule for bundling markup.
 * @returns {RuleSetRule} Markup bundling rules.
 */
function defineMarkup(): RuleSetRule {
    return {
        test: /\.html$/,
        use: [
            {
                loader: 'html-loader',
                options: {
                    minimize: false,
                    esModule: true
                }
            }
        ]
    };
}

/**
 * Defines a RuleSetRule for bundling global CSS.
 * @returns {RuleSetRule} Global CSS bundling rules.
 */
function defineGlobalCSS(): RuleSetRule {
    //  Handles any bits of third party CSS and whatever we define.
    /**@type RuleSetRule */
    return {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        exclude: /\.module\.css$/
    };
}

/**
 * Defines a RuleSetRule for bundling global CSS.
 * @returns {RuleSetRule} Global CSS bundling rules.
 */
function defineModuleCSS(): RuleSetRule {
    return {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                    modules: {
                        mode: 'local',
                        localIdentName: 'echo-[folder]__[local]-[hash:base64:5]'
                    }
                }
            }
        ],
        include: /\.module\.css$/
    };
}

/**
 * Defines a RuleSetRule for bundling images.
 * @returns {RuleSetRule} Image bundling rules.
 */
function defineImages(): RuleSetRule {
    return {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './resources/images/'
                }
            }
        ]
    };
}

/**
 * Defines a RuleSetRule for bundling icons.
 * @returns {RuleSetRule} Icon resources.
 */
function defineIcons(): RuleSetRule {
    return {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    native: false
                }
            },
            { loader: 'url-loader' }
        ]
    };
}

/**
 * Defines a RuleSetRule for bundling fonts.
 * @returns {RuleSetRule} Font resources.
 */
function defineFonts(): RuleSetRule {
    return {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    outputPath: 'resources/fonts/',
                    name: '[name].[ext]'
                }
            }
        ]
    };
}

/**
 * Defines a RuleSetRule for bundling worker.
 * @returns {RuleSetRule} Worker resources.
 */
function defineWorkers(): RuleSetRule {
    return {
        test: /\.worker\.(c|m)?ts$/i,
        use: [
            {
                loader: 'worker-loader'
            },
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    };
}

/**
 *
 *
 * @return {*}  {RuleSetRule} SVG rules
 */
function defineSvg(): RuleSetRule {
    return { test: /\.svg$/, use: ['@svgr/webpack', 'url-loader'] };
}

/**
 *
 *
 * @export
 * @return {*}  {ModuleOptions}
 */
export function defineModule(): ModuleOptions {
    const tsLoader = defineTsLoader();
    const transpiler = defineTranspiler();
    const markup = defineMarkup();
    const fonts = defineFonts();
    const images = defineImages();
    const svg = defineSvg();
    const moduleCSS = defineModuleCSS();
    const globalCSS = defineGlobalCSS();
    const icons = defineIcons();
    const worker = defineWorkers();

    return {
        rules: [tsLoader, transpiler, moduleCSS, globalCSS, worker]
    };
}
