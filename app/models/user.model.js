module.exports = mongoose => {
  var schema = mongoose.Schema(
      {
        userName: String,
        email: String,
        password: String
      },
      { timestamps: true }
  );

// Transform _id by id for the front-end 
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};