const expressAsyncHandler = require("express-async-handler");
const Article = require("../model/index")
const User = require("../../user/model/index")
const util = require("../../../../helper/util")

exports.create = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    try {
        const newArticle = await Article.create(data)

        const arr = [newArticle._id]

        const updateUser = await User.findByIdAndUpdate(req.id, { articles: arr })
        console.log(req.id)
        console.log(updateUser)

        res.status(201).json({
            responseCode: 1,
            responseMessage: "Article Created Successfully."
        })
    }
    catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})

exports.update = expressAsyncHandler(async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    try {
        if (!id) {
            res.status(404).json({
                responseCode: 0,
                responseMessage: "Article doesn't exist."
            })
        } else {
            const updateArticle = await Article.findByIdAndUpdate(id, data)

            res.status(200).json({
                responseCode: 1,
                responseMessage: "Article updated successfully."
            })
        }
    }
    catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})

exports.index = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);

        res.status(201).json({
            responseCode: 0,
            responseMessage: "Listed Article",
            responseData: article
        })
    }
    catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})

// exports.indexAll = expressAsyncHandler(async (req,res) => {
//     try{
//         const articles = await Article.find()
//     }
//     catch(err){
//         res.status(500).json({
//             responseCode: 0,
//             responseMessage: err.message
//         })
//     }
// })

exports.delete = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteArticle = await Article.findByIdAndDelete(id);

        res.status(200).json({
            responseCode: 1,
            responseMessage: "Article Deleted",
        })
    }
    catch (err) {
        res.status(500).json({
            responseCode: 0,
            responseMessage: err.message
        })
    }
})