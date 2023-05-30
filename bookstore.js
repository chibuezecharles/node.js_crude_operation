const store = [
    {
        category: 'science',
        books: [
            {
                id: 1,
                name:'Advanced Physics',
                isbn:7,
                author: 'Unago c. Shege',
                pages:1700,
            },
            {
                id: 2,
                name:'System Chemistry',
                isbn:14,
                author: 'Ugo c. Ugo',
                pages:1500,
            },
        ],
        totalBooks:2,
    },

    {
        category: 'art',
        books: [
            {
                id: 1,
                name:'Lit in English',
                isbn:9,
                author: 'Queen Marry',
                pages:1000,
            },
            {
                id: 2,
                name:'Things Fall Apart',
                isbn:14,
                author: 'Chinua Achebe',
                pages:1300,
            },
        ],
        totalBooks:2,
    },
]


module.exports = store;