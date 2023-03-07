const addComment = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment-content').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

        if (comment) {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ content, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to create comment');
            }
        }
};

document.querySelector('#add-comment').addEventListener('click', addComment);