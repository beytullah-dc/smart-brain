const Clarifai = require("clarifai");

const API_KEY = "10668db5af354ad09bd45a88d54f174b";

const app = new Clarifai.App({
  apiKey: API_KEY,
});
const handleApiCall = (req,res) => {
  app.models
  .predict(Clarifai.FACE_EMBED_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  }).catch(err => res.status(400).json("failed"))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db.select('*').from('users').where({
    id:id
  }).then(user => {
    if(user.length>0){
      const newEntries = parseInt(user[0].entries)+1;
      db('users').where('id','=',id)
      .increment('entries',1)
      .returning('entries')
      .then(entries => res.json(entries[0].entries))
    }else{
      res.status(400).json("failed")
    }
  });
}
module.exports = {
  handleImage:handleImage,
  handleApiCall:handleApiCall
};