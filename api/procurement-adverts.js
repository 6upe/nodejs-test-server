module.exports = (req, res) => {

    const adverts = [
        {
            advertID: "1",
            advertTitle: "Job Oppotunity: 2 Software Developers",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (1).jpg"
        },
        {
            advertID: "2",
            advertTitle: "Tender: Renovation of Ablution Block",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (2).jpg"
        },
        {
            advertID: "3",
            advertTitle: "Supplier Registration",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (3).jpg"
        },
        {
            advertID: "4",
            advertTitle: "Contract Awards",
            advertBody: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            advertCreatedAt: "22 Jan, 2023",
            advertImagePath: "../procurement-images/procurement (4).jpg"
        },
 
    ];

    res.json(adverts);
};