function Book(data) {
    this.bookShelf = data.kind;
    this.title = data.volumeInfo.title;
    this.auther = data.volumeInfo.authors ? data.volumeInfo.authors.join(', ') : 'Anonymous';
    this.description = data.volumeInfo.title;
    this.image = getSecureUrl(data.volumeInfo.imageLinks.thumbnail);
    this.isbn = data.etag;
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