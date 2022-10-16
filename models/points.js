const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointsSchema = new Schema(
  {
    points: {
      type: Number,
      trim: true,
      required: "Points is required",
    },
  },
  { toJSON: { virtuals: true } }
);

PointsSchema.virtual("score").get(function () {
  console.log(this.points);
  return `${this.points}`;
});

const Points = mongoose.model("Points", PointsSchema);

module.exports = Points;
