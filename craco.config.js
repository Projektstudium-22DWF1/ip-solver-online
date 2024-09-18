module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          fs: false, // `fs` wird in der Browserumgebung nicht benötigt
          path: require.resolve("path-browserify"),
        },
      },
    },
  },
};
