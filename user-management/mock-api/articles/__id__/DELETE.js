module.exports = (req, res) => {
  return res.status(204).send({
    id: req.body.id,
    title: req.body.title,
    user_id: req.body.user_id,
  });
};
