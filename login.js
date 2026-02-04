document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login form submitted!");
});

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    alert("Google Sign-In Successful!");
    window.location.href = "main.html"; // Redirect after successful login
}

// Initialize Google Sign-In
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("googleLogin"),
        { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
};

window.fbAsyncInit = function () {
    FB.init({
        appId: 'YOUR_FACEBOOK_APP_ID',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
    });
};

document.getElementById("facebookLogin").addEventListener("click", function () {
    FB.login(function (response) {
        if (response.status === 'connected') {
            FB.api('/me?fields=name,email', function (userData) {
                console.log(userData);
                alert(`Welcome ${userData.name}`);
                window.location.href = "index.html"; // Redirect after successful login
            });
        } else {
            alert('Facebook Login Failed');
        }
    }, { scope: 'email' });
});


document.getElementById("instagramLogin").addEventListener("click", function () {
    const clientId = "YOUR_INSTAGRAM_APP_ID";
    const redirectUri = "http://localhost:3000/auth";
    const authUrl = `https://api.instagram.com/oauth/authorize
                      ?client_id=${clientId}
                      &redirect_uri=${redirectUri}
                      &scope=user_profile,user_media
                      &response_type=code`;

    window.location.href = authUrl; // Redirect to Instagram Auth
});

// Handle Instagram Redirect in "auth.html"
if (window.location.search.includes('code=')) {
    alert("Instagram Login Successful!");
    window.location.href = "index.html"; // Redirect after successful login
}
