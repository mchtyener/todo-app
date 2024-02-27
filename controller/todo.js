const env = require("dotenv")
const {todo, validateTodo} = require('../models/todo')
const {StatusCodes} = require('http-status-codes');
const {user} = require("../models/user");
env.config()

exports.create = (async (req, res) => {
    try {
        const {error} = await validateTodo(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({
                err: error.message,
                success: false
            });
        }
        const {title, description, userId} = req.body
        const userData = await user.findOne({_id: userId});
        if (!userData) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Böyle bir kullanıcı mevcut değil.",
                success: false
            });
        }
        const newTodo = new todo({title, description, userId});
        let data = await newTodo.save()
        return res.status(StatusCodes.OK).json({
            data,
            success: true
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false
        });
    }
})

exports.update = (async (req, res) => {
    try {
        const {error} = await validateTodo(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({err: error.message, success: false});
        }
        let updateData = await todo.findByIdAndUpdate(req.params.id, {
            $set: {
                description: req.body.description,
                title: req.body.title,
            }
        })
        return res.status(StatusCodes.OK).json({data: updateData, success: true});
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
    }
})

exports.remove = (async (req, res) => {
    try {
        let id = req.params.id
        await todo.deleteOne({_id: id})
        return res.status(StatusCodes.OK).json({
            success: true,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
    }
})

exports.list = (async (req, res) => {
    try {
        const data = await todo.find().populate('userId');
        return res.status(StatusCodes.OK).json({
            data: data,
            success: true
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Listeleme sırasında bir hata oluştu."
        });
    }
})
