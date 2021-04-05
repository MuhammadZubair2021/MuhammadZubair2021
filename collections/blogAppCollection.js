const Blogs= require('../models/blogsSchema');

//detail_index
const detail_index = (req,res) => {
    res.redirect('/blogs');
}

// Create New blog (post method)
const create_blog = (req,res)=>{
    const blogs = new Blogs(req.body);
    blogs.save()
    .then((results)=>{
        res.redirect('/blogs');
    })
    .catch((error)=>{
        res.send(error);
    })  
}

//Request for all the blogs page.
const all_blogs = (req,res)=>{
    Blogs.find()
    .then((results)=>{               
        res.render('../views/blogsFolder/index',{
                                                 sentTitle:'All blogs',
                                                 sentBlogs : results
                                                });
    })
}


//Create a request for showing a blog in a details when some one click on Title, snippet or body of the blog
const find_by_id = (req,res)=>{
    const id = req.params.id;
    Blogs.findById(id)
    .then((results)=>{        
        res.render('../views/blogsFolder/details',{
                                                    sentTitle:(results.title),           
                                                    fullBlog : results});
    }).catch(error => {
        res.status(404).render('../views/blogsFolder/error', {sentTitle:'Page Not Found'});
        })
}

//Function for Delete request
const delete_by_Id = (req,res)=>{
    const id = req.params.id;
    Blogs.findByIdAndDelete(id)
    .then(results=>{
        res.json({ url :'/blogs'});
    })
    .catch(error=>{
        console.log(error);
    })
}


//Function for Update request
const update_by_Id = (req,res)=>{
    const id = req.params.id;    
    Blogs.findByIdAndUpdate(id)
    .then(results=>{
        res.render('../views/blogsFolder/update',{
                                                     sentTitle:(results.title),           
                                                      fullBlog : results});
    })
    .catch(error=>{
        console.log(error);
    })
}

//Request for rendering error page incase user type wrong url
const un_matched_url = (req,res)=>{
    res.status(404).render('../views/blogsFolder/error', {sentTitle:'Page Not Found'});    
}

//Export all the functions...
module.exports = {
    detail_index, 
    create_blog,  
    all_blogs,
    find_by_id,
    delete_by_Id,    
    update_by_Id,
    un_matched_url
}