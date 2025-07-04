// scripts.js

// Toast display function
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#4caf50';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = 'bold';
    toast.style.display = 'none';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      const button = e.target;
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'), 10);

      if (!name || isNaN(price)) {
        alert('Invalid product data!');
        return;
      }

      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      showToast(`Added "${name}" to cart!`);
    }
  });
});

  // Show the popups with a delay
  window.onload = function () {
    setTimeout(() => {
      document.getElementById('welcomePopup').style.display = 'block';
    }, 1000); // 1 second delay

    setTimeout(() => {
      document.getElementById('discountPopup').style.display = 'block';
    }, 4000); // 4 seconds delay
  };

  // Close popup
  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }

document.addEventListener("DOMContentLoaded", function () {
  const newsletterModal = document.getElementById("newsletterModal");
  const subscribeBtn = document.getElementById("subscribeBtn");
  const closeBtn = document.querySelector(".close-newsletter");
  const emailInput = document.getElementById("newsletterEmail");

  // Reset localStorage for testing — remove this line in production
  localStorage.removeItem("newsletterShown");

  // Show modal when scroll reaches 50%
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrolled > 0.5 && !localStorage.getItem("newsletterShown")) {
      newsletterModal.classList.add("show");
    }
  });

  // Close modal
  closeBtn.onclick = () => {
    newsletterModal.classList.remove("show");
    localStorage.setItem("newsletterShown", true);
  };

  // Subscribe
  subscribeBtn.onclick = () => {
    const email = emailInput.value.trim();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    fetch("https://script.google.com/macros/s/AKfycby3C69XflXs0YIXwLkhMcZVYhTI3JvJw9UQjYyA_m9TLacueIEGb8ttpxZpT8eN6A9qRg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${encodeURIComponent(email)}`
    })
    .then(() => {
      alert("✅ Subscribed! Thank you.");
      newsletterModal.classList.remove("show");
      localStorage.setItem("newsletterShown", true);
    })
    .catch(() => {
      alert("⚠️ Something went wrong. Try again later.");
    });
  };
});

