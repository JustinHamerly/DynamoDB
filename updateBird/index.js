const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
    
  const jsonBody = JSON.parse(event.body);
  
  const newBird = {
    name: jsonBody.name,
    wingspan: jsonBody.wingspan,
    location: jsonBody.location,
  }
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
  const id = event.pathParameters.id;
  const idNum = parseInt(id);
  
  try {
    data = await birdTable.update(idNum, newBird);
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
