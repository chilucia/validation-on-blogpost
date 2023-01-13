require('dotenv').config();
const postModel = require('../models').blogPost;
const validator = require ('fastest-validator');
const  fs  = require('fs');
const cloudinary = require('../helper/cloudinary');
//const path = require('path')

const newPost = async(req,res)=> {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
        const data={
            title:req.body.title,
            desc:req.body.desc,
            postImage:req.file.path,
            content:req.body.content,
            commentId:req.body.commentId,
            cloudUrl:result.secure_url,
            cloudId:result.public_id
        }

        const postSchema ={
            title:{type:'string',optional: false},
            desc: {type:'string',optional:false},
            postImage: {type:'string',optional:true},
            content: {type:'string',optional:false},
            commentId: {type:'string',optional:false},
            cloudUrl:{type:'string',optional:false},
            cloudId:{type:'string',optional:false}
        }
        const v = new validator();
        const validatorResponse = v.validate(data,postSchema);

        const createdPost = await postModel.create(data);
        if(validatorResponse !== true){
            return res.status(400).json({
                message:'Validation Failed',
                errors:validatorResponse[0].message
            })
        }else{
            res.status(201).json({
                message:'New post was created.',
                data: createdPost
            })
        }
    }catch(e){
        res.status(400).json({
            message:e.message
        })

    }
}

const allPost = async(req,res)=> {
    try{
        const posts = await postModel.findAll();
        if (posts.length === 0){
            res.status(404).json({
                message:'No posts found in the database'
            })
        }else{
            res.status(200).json({
                message:"All posts",
                data:posts
            })
        }
    }catch(e){
        res.status(404).json({
            message:e.message
        })
    }
}

const singlePost = async (req,res) => {
    try{
        const id = req.params.id;
        const post = await postModel.findAll({where:{id:id}})
        if (!post){
            res.status(404).json({
                message:`Cannot find post with id: ${id}`
            })
        }else{
            res.status(200).json({
                data:post
            })
        }   
    }catch(e){
        res.status(404).json({
            message:e.message
        })
    }
}
const removePost = async(req,res) => {
    try{
    const id = req.params.id;
    const post = await postModel.findAll({where:{id:id}})
    //remove upload from the uploaded file;
    await fs.unlinkSync(post[0].postImage);
    await cloudinary.uploader.destroy(post[0].cloudId)
    await postModel.destroy({where:{id:id}})

    res.status(200).json({
        message:'Deleted successfully.'
    })
    }catch(e){
        res.status(404).json({
            message:e.message
        })
    }
}

const updatePost =async (request,res) => {
    try{
        const id = request.params.id;
    const post = await postModel.findAll({where:{id:id}})

    const result = await cloudinary.uploader.upload(request.file.path)
        const postData = {
            title:request.body.title,
            desc: request.body.desc,
            postImage: request.file.path,
            content: request.body.content,
            commentId:request.body.commentId,
            cloudId:result.public_id,
            cloudUrl:result.secure_url

        }
        
        const postSchema = {
            title: {type: 'string', optional: true},
            desc: {type: 'string', optional: true},
            postImage: {type: 'string', optional: true},
            content: {type: 'string', optional: true},
            commentId: {type: 'string', optional: true},
            cloudId:{type:'string',optional:true},
            cloudUrl:{type:'string',optional:true}
    }

    let v = new validator();
    const validatorResponse = v.validate(postData,postSchema)
    if(validatorResponse !== true){
        return res.status(400).json({
            message:'validation failed',
            errors:validatorResponse[0].message
        })
    }else{
        await cloudinary.uploader.destroy(post[0].cloudId)
        await fs.unlinkSync(post[0].postImage)
        const updatedPost= await postModel.update(postData,{where:{id:id}},
            {new:true})
        res.status(201).json({
            message:'Post updated successfully.',
            data:updatedPost
        })
    }
}catch(e){
    res.status(400).json({
        message:e.message
    })
}};

module.exports = {
    newPost,
    allPost,
    removePost,
    singlePost,
    updatePost
}
