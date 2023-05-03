module.exports = (req,res) => {

    const blogs = [
        {
          blogID: "1",
          blogTitle: "My First Blog Post",
          blogContent: "Lorem ipsum dolor sit amet...",
        },
        {
          blogID: "2",
          blogTitle: "My Second Blog Post",
          blogContent: "Lorem ipsum dolor sit amet...",
        },
        {
          blogID: "3",
          blogTitle: "My Third Blog Post",
          blogContent: "Lorem ipsum dolor sit amet...",
        },
      ];
    
      res.json(blogs);
};