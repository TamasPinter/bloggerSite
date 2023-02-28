const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application'},
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to Log Out!');
    }
};

document.querySelector('#logout').addEventListener('click', logout);