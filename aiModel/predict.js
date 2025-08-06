const ort = require('onnxruntime-node');
const path = require('path');
const sharp = require('sharp');

const labels = ["Normal", "Road Issues", "Garbage", "Water logging", "Other Issue"];

async function classifyImage(imagePath) {
  const modelPath = path.join(__dirname, 'model.onnx');
  const session = await ort.InferenceSession.create(modelPath);

  // Preprocess image: resize + normalize (adjust size and format as per training)
  const tensor = await sharp(imagePath)
    .resize(224, 224)
    .removeAlpha()
    .raw()
    .toBuffer()
    .then(buffer => new ort.Tensor('float32', Float32Array.from(buffer), [1, 3, 224, 224]));

  const results = await session.run({ input: tensor });
  const scores = results.output.data;
  const maxIndex = scores.indexOf(Math.max(...scores));
  return {result: labels[maxIndex], confidence: scores[maxIndex], otherScores: scores };
}

module.exports = classifyImage;
