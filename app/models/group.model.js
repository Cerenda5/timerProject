module.exports = mongoose => {
  var groupSchema = mongoose.Schema(
      {
        groupName: String,
        admin: Boolean,
        members: String
      },
      { timestamps: true }
  );

// Transform _id by id for the front-end 
  groupSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Group = mongoose.model("group", groupSchema);
  return Group;
};