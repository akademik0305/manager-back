import {Schema, model} from "mongoose";

const Task = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  // finished_at: {type: String},
  // category_id: {type: String, ref: 'Category'},
  user_id: {type: String, required: true, ref: 'User'}
})

export default model('Task', Task)