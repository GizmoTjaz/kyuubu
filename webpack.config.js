module.exports = {
    entry: "./build",
    output: {
        filename: "kyuubu.bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-proposal-class-properties",
                            { "loose": true }
                            ]
                        ]
                    }
                }
            }
        ],
    }
};