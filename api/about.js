module.exports = (req, res) => {
    res.status(200).json({
      message: "Welcome to the About page!",
      author: "Your Name",
      version: "1.0.0"
    });
  };

  
  