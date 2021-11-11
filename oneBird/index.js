const dynamoose = require('dynamoose');

exports.handler = async (event) => {
    
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
    // read from our DB
    data = await birdTable.query("id").eq(idNum).exec();
    status = 200; 
  } catch(e) {
    data = new Error(e);
    status = 400;
  }

  const response = {
      statusCode: status,
      body: JSON.stringify(data),
  };
  return response;
};
