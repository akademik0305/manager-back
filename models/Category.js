import {Schema, model} from "mongoose";

const Category = new Schema({
  key: {type: String, required: true},
  value: {type: String, required: true},
})

export default model('Category', Category)