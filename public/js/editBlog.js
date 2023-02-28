const editBlog = document.querySelector('.editBlogForm');
const content = document.querySelector('.editBlogContent');
const title = document.querySelectore('.editBlogTitle');

editBlog.addEventListener('submit', (event) => {
    event.preventDefault();

    const blogId = (window.location.pathname.split('/')[2]);

    const blogData = {
        title: title.value,
        content: content.value,
    };

    fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
    })
    .then((response) => {
        if (response.status === 200) {
            window.location.href = '/dash';
        }
    })
    .catch((err) => console.log(err));
});