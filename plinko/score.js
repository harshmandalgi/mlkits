const outputs = [];
// const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a ball drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // Ran every time Analyze button is pressed
  const testSetSize = 10;
  const [testingSet, trainingSet] = splitDataset(outputs, testSetSize);

  _.range(1, 21).forEach(k => {
    const accuracy = _.chain(testingSet)
      .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === testPoint[3])
      .size()
      .divide(testSetSize)
      .value(); 

    console.log(`For k of ${k}, Accuracy is: ${accuracy}`);
  });
  
}

// function knn(data, point, k) {
//   return _.chain(data)
//     .map(row => {
//       return [
//         distance(row[0], point), 
//         _.last(row)
//       ];
//     })
//     .sortBy(row => row[0])
//     .slice(0, k)
//     .countBy(row => row[1])
//     .toPairs()
//     .sortBy(row => row[1])
//     .last()
//     .first()
//     .parseInt()
//     .value();
// }

// function distance(a, b) {
//   return Math.abs(a-b);
//   // return _.chain(a)
//   //   .zip(b)
//   //   .map(([a,b]) => (a-b) ** 2 )
//   //   .sum()
//   //   .value() ** 0.5;
// } 

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);

  const testingData = _.slice(shuffled, 0, testCount);
  const trainingData = _.slice(shuffled, testCount);

  return [testingData, trainingData];
}

function minMax(data, featureCount) {
  const clonedData = _.cloneDeep(data);
  for(let i = 0; i<featureCount; i++) {
    const column = clonedData.map(row => row[i]);
    const min = _.min(column);
    const max = _.max(column);

    for(let j = 0; j<clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min)/(max-min);
    }
  }

  return clonedData;
}


// const features = tf.tensor([
// 	[-121, 47],
//   [-121.2, 46.5],
//   [-122, 46.4],
//   [-120.9, 46.7]
// ]);

// const labels = tf.tensor([
// 	[200], 
//   [250], 
//   [215],
//   [240]
// ]);

// const predPoint = tf.tensor([-121, 47]);
// const k = 2;
// features
// 	.sub(predPoint)
// 	.pow(2)
// 	.sum(1)
// 	.pow(.5)
// 	.expandDims(1)
// 	.concat(labels, 1)
// 	.unstack()
// 	.sort((a,b)=> a.get(0) > b.get(0) ? 1 : -1)
// 	.slice(0, k)
// 	.reduce((acc, pair) => acc + pair.get(1), 0) / k;
	