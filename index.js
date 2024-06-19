const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public"))); 
let posts = [
    {     id:uuidv4(),
        username:"ahamadali",
     content:"i love coding"
    },
    {   id:uuidv4(),
        username:"simpalverma",
        content:"i got my first internship at microsoft",
    },
    {       id:uuidv4(),
        username:"antrikshverma",
        content:"i got 97 percentiles in jee mains this time",
    }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
   res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
   let post = posts.find((p)=>id===p.id);
   console.log(posts);
   res.render("show.ejs",{post});
})
app.patch("/posts/:id", (req,res)=>{
    let {id}  =req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent;
    
   
    console.log(posts);

   
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let postIndex = posts.findIndex((p) => id === p.id); 
    if (postIndex === -1) {
       
        res.status(404).send("Post not found");
        return;
    }

    let post = posts[postIndex];
    res.render("edit.ejs", { post, postIndex }); 
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.listen(port, () =>{
    console.log("listening to port : 8080");
})
