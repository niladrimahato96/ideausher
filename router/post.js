const router = require('express').Router();
const Post = require('../models/post');
const posts = require('../data/posts');

router.get('/', (req, res, next) => {
    const { title, description, tags, id, sort, page } = req.query;
    
    let filteredPosts = [];

    let mapCheck = {
        title: title ? (title != undefined && title != null && title.trim() != "" ? false : null) : null,
        description: description ? (description != undefined && description != null && description.trim() != "" ? false : null) : null,
        tags: tags ? (JSON.parse(tags) && JSON.parse(tags).length > 0 ? false : null) : null,
        id: id != undefined && id != null ? false : null,
        sort: sort ? (sort == "asc" || sort == "desc" ? false : null) : null,
        page: page != undefined && page != null ? false : null,
    };

    filteredPosts = posts.filter((post) => {
        if( mapCheck['title'] === false && title !== post.title ) return false;

        if( mapCheck['description'] === false && description !== post.description ) return false;

        if( mapCheck['tags'] === false && tags !== post.tags ) {
            let postTags = {};
            let parsedTags = JSON.parse(tags);
            post.tagIds.forEach((val, i) => {
                postTags[val] = val;
            });
            
            for ( let i = 0 ; i < parsedTags.length ; i++ ) {
                if ( !(`${parsedTags[i]}` in postTags) ) return false;
            }
        };
        
        if( mapCheck['id'] === false && Number(id) !== post.id ) return false;

        return true;

    });

    if( mapCheck['sort'] === false && sort === 'desc' ) {
        filteredPosts.sort((a, b) => {
            return b.id - a.id;
        });
    }

    if ( mapCheck['page'] === false ) {

        if( Number(page) !== 1 ) {
            let skip = 0;

            for(let i = 1 ; i < Number(page) ; i++ ) {
                skip = skip + 4;
            }
            filteredPosts.splice(0, skip);
        } 
         
        filteredPosts = filteredPosts.slice(0, 4);

    }

    res.json({filteredPosts});
});

router.post('/', (req, res, next) => {
    const { title, description, tags, image } = req.body;

    const post = new Post(posts.length + 1, title, description, image, JSON.parse(tags));

    posts.push(post);

    res.json({ post });
});

module.exports = router;