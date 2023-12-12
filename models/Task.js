import {Schema, model} from "mongoose";

const Task = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  // finished_at: {type: String},
  user_id: {type: String, required: true, ref: 'User'},
  category_key: {type: String, ref: 'Category'},
})

export default model('Task', Task)