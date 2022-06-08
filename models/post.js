class Post {
    constructor(id, title, description, image, tagIds) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.tagIds = tagIds;
    }
}

module.exports = Post;

