function Note() {
}

module.exports = function(app) {
  app.sequelize();
  return Note;
};
