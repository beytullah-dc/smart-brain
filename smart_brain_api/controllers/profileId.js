const handleProfileId = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id:id,
  }).then(user => {
    if(user.length>0){
      res.json(user[0]);
    }else{
      res.status(400).json("failed");
    }
  });
}
module.exports = {
  handleProfileId:handleProfileId
}