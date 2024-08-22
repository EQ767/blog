document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
});

function fetchPosts() {
    // Fetching the list of files in the current directory
    fetch('./')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const files = Array.from(doc.querySelectorAll('a'))
                                .map(link => link.getAttribute('href'))
                                .filter(name => name.endsWith('.txt') || name.endsWith('.docx'));

            files.forEach(file => {
                fetch(file)
                    .then(response => response.text())
                    .then(content => {
                        displayPost(file, content);
                    });
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

function displayPost(title, content) {
    const postSection = document.getElementById('posts');
    const postElement = document.createElement('article');
    postElement.className = 'post';
    postElement.innerHTML = `
        <h2>${title}</h2>
        <p>${content.substring(0, 200)}...</p>
        <a href="#" onclick="readMore('${title}', '${content}')">阅读全文</a>
    `;
    postSection.appendChild(postElement);
}

function readMore(title, content) {
    alert(`文章标题: ${title}\n\n${content}`);
}