const axios = require('axios');

exports.handler = async (event) => {
  const { data, sha } = JSON.parse(event.body);
  const token = process.env.GITHUB_TOKEN;
  
  try {
    const response = await axios.put(
      `https://api.github.com/repos/${process.env.GITHUB_USER}/inventory-system/contents/data.json`,
      {
        message: "Inventory update",
        content: Buffer.from(JSON.stringify(data)).toString('base64'),
        sha: sha
      },
      {
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { statusCode: 200, body: JSON.stringify(response.data) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
