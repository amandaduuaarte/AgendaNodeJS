const secondController = (req, res) => {
  res.send(req.params.id);
};

module.exports = { secondController };
