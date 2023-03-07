const editBlog = async (event) => {
    event.preventDefault ();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value.trim();
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dash');
    } else {
        alert('Failed to edit!');
    }
};

const delHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert('Failed to delete!')
        }
    }
};

document.querySelector('#edit-blog-form').addEventListener('click', editBlog);
document.querySelector('#delete-blog').addEventListener('click', delHandler);