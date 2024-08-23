function loadFileContent(filename) {
    fetch(filename)
        .then(response => {
            if (filename.endsWith('.docx')) {
                return response.arrayBuffer();
            } else {
                return response.text();
            }
        })
        .then(content => {
            if (filename.endsWith('.docx')) {
                return mammoth.convertToHtml({ arrayBuffer: content })
                    .then(result => result.value);
            } else {
                return `<pre>${content}</pre>`;
            }
        })
        .then(htmlContent => {
            document.getElementById('file-content').innerHTML = htmlContent;
            document.getElementById('modal').style.display = 'block';
            document.getElementById('modal-overlay').style.display = 'block'; // 显示遮罩层
        })
        .catch(error => {
            alert('Error loading file content');
            console.error('Error:', error);
        });
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none'; // 隐藏遮罩层
    document.getElementById('file-content').innerHTML = '';
}
