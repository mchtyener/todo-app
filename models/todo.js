const mongoose = require('mongoose')
const joi = require("joi");

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, trim: true
    },
});

const validateTodo = (data) => {

    const schema = joi.object({

        title: joi.string().empty().min(3).max(100).required().messages({
            "string.base": "Başlık alanı metinsel(string) bir değer olmak zorunda.",
            "string.empty": "Başlık alanı boş bırakılamaz.",
            "string.max": "Başlık maximum 100 karakter girebilirsiniz.",
            "string.min": "Başlık minimum 3 karakterden oluşturabilirsiniz.",
            "string.required": "Başlık alanı zorunludur."
        }),
        description: joi.string().empty().min(3).max(100).required().messages({
            "string.base": "Açıklama alanı metinsel(string) bir değer olmak zorunda.",
            "string.empty": "Açıklama alanı boş bırakılamaz.",
            "string.max": "Açıklama alanı maximum 100 karakter girebilirsiniz.",
            "string.min": "Açıklama alanı minimum 3 karakterden oluşturabilirsiniz.",
            "string.required": "Açıklama alanı zorunludur."
        }),
        userId: joi.string().empty().required().messages({
            "boolean.empty": "Kullanıcı id  boş bırakılamaz.",
            "boolean.required": "Kullanıcı id zorunlu"
        }),
    });
    return schema.validate(data, {abortEarly: false})
}
const todo = mongoose.model('todo', todoSchema)
module.exports = {todo, validateTodo}
