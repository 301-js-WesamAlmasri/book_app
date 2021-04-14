function Book(data) {
    this.book_shelf = data.volumeInfo.categories ? data.volumeInfo.categories.join(', ') : 'N/A';
    this.title = data.volumeInfo.title ? data.volumeInfo.title : 'Tile not available';
    this.auther = data.volumeInfo.authors ? data.volumeInfo.authors.join(', ') : 'Anonymous';
    this.description = data.volumeInfo.description ? data.volumeInfo.description : 'No description available';
    this.image_url = data.volumeInfo.imageLinks ? getSecureUrl(data.volumeInfo.imageLinks.thumbnail) : 'https://i.imgur.com/J5LVHEL.jpg';
    this.isbn = data.industryIdentifiers ? data.industryIdentifiers[0].identifier : 'N/A';
}

// function to get secure protocol url
function getSecureUrl(url){
    let [protocol, restOfUrl] = url.split(':');
    if(protocol === 'https') return url;
    else if(protocol === 'http') return `${protocol}s:${restOfUrl}`;
    else return 'https://i.imgur.com/J5LVHEL.jpg'
}


module.exports = {
    Book
}