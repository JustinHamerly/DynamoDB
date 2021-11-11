const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
    
  const jsonBody = JSON.parse(event.body);

  // define a schema for dynamoose / dynamo db
  const birdSchema = new dynamoose.Schema({
    'id': Number,
    'name': String,
    'wingspan': String,
    'location': String
  });
  
  const birdTable = dynamoose.model('birds', birdSchema);

  let data = null;
  let status = 500;

  try {
    let id = Math.floor(Math.random() * 100000000)
    let bird = new birdTable({ id, ...jsonBody});
    data = await bird.save();
    status = 200;

  } catch(e) {
    status = 400;
    data = new Error(e);
  }

  const response = {
      statusCode: status,
      body: JSON.stringify(data),
  };
  return response;
};
