const newBlog = document.getElementById('newBlog')

newBlog.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title: title, content: content } = event.target.elements;

    const blogData = {
        title: title.value,
        content: content.value,
    };
    fetch('/api/blogRoutes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blogDatat),
    })
    .then((response) => {
        if (response.status === 200) {
            window.location.href = '/dash';
        }
    })
    .catch((err) => console.log(err));
});