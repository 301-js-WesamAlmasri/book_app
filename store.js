function Book(data) {
    this.book_shelf = data.volumeInfo.categories ? data.volumeInfo.categories.join(', ') : 'N/A';
    this.title = data.volumeInfo.title ? data.volumeInfo.title : 'N/A';
    this.auther = data.volumeInfo.authors ? data.volumeInfo.authors.join(', ') : 'Anonymous';
    this.description = data.volumeInfo.description ? data.volumeInfo.description : 'N/A';
    this.image_url = data.volumeInfo.imageLinks ? getSecureUrl(data.volumeInfo.imageLinks.thumbnail) : 'https://i.imgur.com/J5LVHEL.jpg';
    this.isbn = data.industryIdentifiers ? Object.entries(data.industryIdentifiers[0]).join(' ') : 'N/A';
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