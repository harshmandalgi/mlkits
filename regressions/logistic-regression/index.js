require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const loadCSV = require('../load-csv');
const LogisticRegression = require('./logistic-regression');
// const plot = require('node-remote-plot');

const { features, labels, testFeatures, testLabels } = loadCSV(
  '../data/cars.csv',
  {
    dataColumns: ['horsepower', 'displacement', 'weight'],
    labelColumns: ['passedemissions'],
    shuffle: true,
    splitTest: 100,
    converters: {
      passedemissions: value => {
        return value === 'TRUE' ? 1 : 0;
      }
    } 
  }
);

const regression = new LogisticRegression(features, labels, {
  learningRate: 0.1,
  iterations: 50,
  batchSize: 5
});

regression.train();

console.log(regression.test(testFeatures, testLabels));

// plot({
//   x: regression.costHistory.reverse()
// });
