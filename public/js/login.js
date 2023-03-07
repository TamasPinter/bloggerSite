const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailL').value.trim();
    const password = document.querySelector('#passwordL').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/dash');
        } else {
            alert('Failed to Log IN');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#nameSu').value.trim();
    const email = document.querySelector('#emailSu').value.trim();
    const password = document.querySelector('#passwordSu').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dash');
        } else {
            alert('Failed to Sign Up');
        }
    }
};

document.querySelector('loginForm').addEventListener('submit', loginFormHandler);
document.querySelector('signupForm').addEventListener('submit', signupFormHandler);