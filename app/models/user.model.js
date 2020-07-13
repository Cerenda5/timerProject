module.exports = mongoose => {
  var userSchema = mongoose.Schema(
      {
        userName: String,
        email: String,
        password: String
      },
      { timestamps: true }
  );

// Transform _id by id for the front-end 
  userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", userSchema);
  return User;
};