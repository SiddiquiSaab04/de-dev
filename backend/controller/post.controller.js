const Post = require('../models/post');
const createPost = async(req,res)=>{
    try {
        if(!req.body.title || !req.body.description) {
            return res.status(400).send({ error: 'Title and description  are required' });
        }
        const post = new Post(req.body);
        await post.save();
        res.status(201).json({"message": "Post created", "data": post});
        console.log(req.body)
    } catch (error) {
        console.error("Error creating Post:", error);
        res.status(500).json({"message": "Internal Server error"});
    }
}

const  getPost = async(req,res)=>{
    try{
        const posts = await Post.find();
        res.status(201).json({"message":
            "Gotall posts","data":posts});
        }
        catch(error){
            res.status(500).json({"message":"Failed to fetch post"});
        }
    
    }

    const updatePost = async (req, res) => {
        try {
          const id = req.params.id; 
          const data = req.body;    
      
          const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
      
          if (updatedPost) {
            res.status(200).json({ message: 'Post updated', data: updatedPost });
          }
      else{
        return res.status(404).json({ message: 'Post not found' });

      }      
        } catch (err){
          res.status(500).json({ message: 'Something went wrong' });
        }
      };
      
      const deletePost = async (req, res) => {
        try {
          const postId = req.params.id;
      
          const deletedPost = await Post.findByIdAndDelete(postId);
      
          if (!postId) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json({ message: 'post deleted successfully', data: deletedPost });
        } catch (error) {
          console.error('Error deleting post:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };
      




module.exports = {
    createPost,
    getPost,
    updatePost,
     deletePost
};