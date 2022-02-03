const helloWorld = async (req, res) => {
  try {
    const data = req.body;
    res.status(200).send(`Hello World, your data: ${JSON.stringify(data)}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default { helloWorld };
