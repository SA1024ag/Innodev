document.addEventListener("DOMContentLoaded", () => {
    // Helper function to toggle the popup display
    function togglePopup(isSignUp) {
        document.getElementById("popup").style.display = 'block';
        document.getElementById("popup-title").textContent = isSignUp ? 'Sign Up' : 'Sign In';
        document.getElementById("popup-submit").textContent = isSignUp ? 'Sign Up' : 'Sign In';
        document.getElementById("confirm-password-section").style.display = isSignUp ? 'block' : 'none';
    }

    // Event Listeners for Sign Up and Sign In buttons
    document.getElementById("signup-btn").addEventListener("click", () => togglePopup(true));
    document.getElementById("signin-btn").addEventListener("click", () => togglePopup(false));

    // Close Popup and Success Message
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup").style.display = 'none';
    });
    document.getElementById("close-success").addEventListener("click", () => {
        document.getElementById("success-message").style.display = 'none';
    });

    // Handle Form Submission for Sign Up or Sign In
    document.getElementById("popup-form").addEventListener("submit", (event) => {
        event.preventDefault();

        // Check if it's Sign Up or Sign In form based on button text
        const isSignUp = document.getElementById("popup-submit").textContent === 'Sign Up';
        const apiUrl = isSignUp ? 'http://localhost:3000/signup' : 'http://localhost:3000/signin';
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const requestBody = { email, password };

        if (isSignUp) {
            const name = document.getElementById("name").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            requestBody.name = name;
        }

        // Make Fetch request to backend
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Close the popup after successful signup or login
                document.getElementById("popup").style.display = 'none';

                // Show success message
                document.getElementById("success-text").textContent = isSignUp ? 'Sign Up Successful!' : 'Sign In Successful!';
                document.getElementById("success-message").style.display = 'block';
            })
            .catch(error => {
                console.error("Error during sign up/sign in:", error);
                alert(`Error during ${isSignUp ? 'sign up' : 'sign in'}!`);
            });
    });

    // Custom cursor movement
    const cursor = document.querySelector("#cursor");
    const cursorBlur = document.querySelector("#cursor-blur");
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
        cursorBlur.style.left = `${e.pageX - 100}px`;
        cursorBlur.style.top = `${e.pageY - 100}px`;
    });

    // GSAP animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#main", {
        backgroundColor: "#000",
        scrollTrigger: {
            trigger: "#main",
            start: "top -25%",
            end: "top -70%",
            scrub: 2
        }
    });

    gsap.to("#navv", {
        backgroundColor: "#000",
        height: "110px",
        scrollTrigger: {
            trigger: "#navv",
            start: "top -10%",
            end: "top -11%",
            scrub: 3
        }
    });

    // Animate elements on scroll
    gsap.from(".card", {
        scale: 0.8,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".card",
            start: "top 70%",
            end: "top 65%",
            scrub: 1,
        }
    });

    gsap.from("#about-us img, #about-us-in", {
        y: 90,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#about-us",
            start: "top 70%",
            end: "top 65%",
            scrub: 1,
        }
    });

    // Animated quotes
    ["colon1", "colon2", "colon3", "colon4"].forEach((id, index) => {
        gsap.from(`#${id}`, {
            y: index % 2 === 0 ? -70 : 70,
            x: index % 2 === 0 ? -70 : 70,
            opacity: 0,
            scrollTrigger: {
                trigger: `#${id}`,
                start: "top 55%",
                end: "top 45%",
                scrub: 4,
            }
        });
    });

    gsap.from("#page4 h1", {
        y: 50,
        scrollTrigger: {
            trigger: "#page4 h1",
            start: "top 75%",
            end: "top 70%",
            scrub: 3,
        }
    });

    // Toggle menu page visibility
    document.getElementById('menu-btn').addEventListener('click', () => {
        const menuPage = document.getElementById('menu-page');
        menuPage.style.display = (menuPage.style.display === 'none' || menuPage.style.display === '') ? 'block' : 'none';
    });
});
