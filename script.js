
//Smooth scroll helper
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

//Navbar hamburger toggle
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navlist');
hamburger && hamburger.addEventListener('click', function () {
    if (navList.style.display === 'flex') navList.style.display = 'none';
    else navList.style.display = 'flex'
})

//Carousal logic
const slides = document.getElementById('slides');
const totalSlides = slides.children.length;
let currentIndex = 0;
function showSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    slides.style.transform = 'translateX(' + (-index * 100) + '%)';
}
document.getElementById('prev').addEventListener('click', function () {
    showSlide(currentIndex - 1);
})
document.getElementById('next').addEventListener('click', function () {
    showSlide(currentIndex + 1);
})


//Auto-advance every 5 seconds 
setInterval(function () {
    showSlide(currentIndex + 1)
}, 5000)

//Quiz modal open/close & submit
const modalBg = document.getElementById('modalBg')
document.getElementById('quizBtn').addEventListener('click', function () {
    modalBg.style.display = 'flex'
});
document.getElementById('closeQuiz').addEventListener('click', function () {
    modalBg.style.display = 'none'; resetQuiz();
})

//Submit quiz
document.getElementById('submitQuiz').addEventListener('click', function () {
    const a1 = document.querySelector('input[name = "q1"]:checked');
    const a2 = document.querySelector('input[name="q2"]:checked');
    let score = 0
    if (a1 && a1.value === 'c') score++;
    if (a2 && a2.value === 'a') score++;
    const result = document.getElementById('quizResult');
    result.style.display = 'block';
    result.innerHTML = '<strong>Score: ' + score + ' /2';
    //Show explanation
    result.innerHTML += '<p class="muted">Answer: 1) JavaScript 2)align-items:center</p>';
})

function resetQuiz() {
    document.getElementById('quizResult').style.display = 'none';
    const checked = document.querySelectorAll('input[type="radio"]:checked');
    checked.forEach(c => c.checked = false)
}


//Contact form basic validation
document.getElementById('sendBtn').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const msg = document.getElementById('formMsg')


    if (name.length < 2) {
        msg.textContent = 'Please enter your name'; return;
    }
    if (!email.includes('@') || email.length < 5) {
        msg.textContent = 'Please enter a valid email'; return;
    }
    if (message.length < 6) {
        msg.textContent = 'Message is too short'; return;
    }

    //pretend to send (since no backend)
    msg.textContent = 'Thank You! Your message has been "sent"';
    //reset form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});
document.getElementById('clearForm').addEventListener('click', function () {

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    document.getElementById('formMsg').textContent = '';

});


//Like 
let likes = 0;
document.getElementById('likeBtn').addEventListener('click', function (e) {
    likes++;
    document.getElementById('likesCount').textContent = likes + 'likes';
    //little heart effect
    e.target.textContent = ' Liked';
    setTimeout(() => e.target.textContent = ' Like', 1200);
})

//Dark mode toggle (simple)
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', function () {
    const theme = document.documentElement.getAttribute('data-theme')
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        darkToggle.textContent = 'Dark'
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkToggle.textContent = 'Light';
    }
});
//Close modal when clicking outside
modalBg.addEventListener('click', function (e) {
    if (e.target === modalBg) {
        modalBg.style.display = 'none';
        resetQuiz();
    }
});

