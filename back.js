document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Mobile Menu Logic ---
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // --- 2. Sticky Header Shadow on Scroll ---
  const header = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 3. Scroll Reveal Intersection Observer ---
  const revealElements = document.querySelectorAll('.animate-on-scroll');
  
  // Set up the initial state for elements
  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve to ensure animation only runs once per page load
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px', // Trigger slightly before it hits the viewport bottom
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
});
/* ==========================================================================
   MEMBER PORTAL INTERACTIONS
   ========================================================================== */

// Handle clicking reaction buttons
function toggleReaction(button, emoji) {
  const countSpan = button.querySelector('.count');
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains('active')) {
    // Remove reaction
    button.classList.remove('active');
    countSpan.textContent = count - 1;
  } else {
    // Add reaction
    button.classList.add('active');
    countSpan.textContent = count + 1;
  }
}

// Handle submitting a new comment
function addComment(event, form) {
  event.preventDefault(); // Prevent page reload
  
  const input = form.querySelector('input[type="text"]');
  const commentText = input.value.trim();
  
  if (commentText) {
    // Find the comment list for this specific post
    const commentList = form.previousElementSibling;
    
    // Create new comment element
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    
    // In a real app, this name would be pulled from the logged-in user's session
    newComment.innerHTML = `<strong>You</strong> ${commentText}`;
    
    // Add the comment to the list
    commentList.appendChild(newComment);
    
    // Clear the input field
    input.value = '';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  // Reveal elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  // Mobile navigation menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
// ==========================================================================
// YES/NO AGE VALIDATION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const ageGate = document.getElementById('age-gate');
  
  if (ageGate) {
    if (!localStorage.getItem('ageVerified')) {
      ageGate.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; 
    } else {
      ageGate.classList.add('hidden');
    }
  }
});

function verifyAge(isOldEnough) {
  const errorMsg = document.getElementById('age-error');

  if (!isOldEnough) {
    errorMsg.style.display = "block";
    return;
  }

  localStorage.setItem('ageVerified', 'true');
  const ageGate = document.getElementById('age-gate');
  ageGate.classList.add('hidden');
  document.body.style.overflow = ''; // Restore scrolling
}
// ==========================================================================
// SCROLL REVEAL ANIMATION LOGIC
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Your existing Age Gate logic stays here ---

  // --- New Scroll Reveal Logic ---
  const revealElements = document.querySelectorAll('.reveal');
  
  // Setup the observer to watch when elements enter the screen
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the 'active' class to trigger the CSS animation
        entry.target.classList.add('active');
        // Stop observing once it has animated so it doesn't repeat on scroll up
        observer.unobserve(entry.target); 
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Triggers slightly before it hits the bottom
  });
  
  // Apply observer to all elements with the 'reveal' class
  revealElements.forEach(el => revealObserver.observe(el));

});
