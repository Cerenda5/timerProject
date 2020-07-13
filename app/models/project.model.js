module.exports = mongoose => {
  var projectSchema = mongoose.Schema(
      {
        projectName: String
      },
      { timestamps: true }
  );

// Transform _id by id for the front-end 
  projectSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Project = mongoose.model("project", projectSchema);
  return Project;
};