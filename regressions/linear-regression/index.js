require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('../load-csv');
const LinearRegression = require('./linear-regression');
const plot = require('node-remote-plot');

let { features, labels, testFeatures, testLabels } = loadCSV('../data/cars.csv', {
  shuffle: true,
  splitTest: 100,
  dataColumns: ['horsepower', 'weight', 'displacement'],
  labelColumns: ['mpg']
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.1,
  iterations: 30,
  batchSize: 10
});

regression.train();
const r2 = regression.test(testFeatures, testLabels);
console.log('R2 is', r2);
regression.predict([[130, 1.752, 307]]).print();

//regression.predict([[120, 2, 380]]).print();


// plot({
//   x: regression.mseHistory.reverse(),
//   xLabel: 'Iteration #',
//   yLabel: 'Mean Squared Error'
// });

//regression.predict([[120, 2, 380]]).print();

// require('@tensorflow/tfjs-node');
// const tf = require('@tensorflow/tfjs');
// const loadCSV = require('./load-csv');
// const LinearRegression = require('./linear-regression');
// const plotlib = require('nodeplotlib');

// let { features, labels, testFeatures, testLabels } = loadCSV('./cars.csv', {
//    shuffle: true,
//    splitTest: 50,
//    dataColumns: ['horsepower', 'weight', 'displacement', 'acceleration', 'cylinders'],
//    labelColumns: ['mpg']
// });

// const regression = new LinearRegression(features, labels, {
//    learningRate: 10,
//    iterations: 100,
// });

// regression.train();
// const r2 = regression.test(testFeatures, testLabels);

// plotlib.plot([{ y: regression.mseHistory, type:'line'}]);

// console.log('R2 =', r2);
