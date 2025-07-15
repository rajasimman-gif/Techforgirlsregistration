let shareCount = 0;
const maxShare = 5;

const shareBtn = document.getElementById('shareBtn');
const counterText = document.getElementById('counter');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('registrationForm');
const successMsg = document.getElementById('successMsg');

// Prevent Resubmission
window.onload = () => {
  if (localStorage.getItem("submitted") === "true") {
    disableForm();
    successMsg.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    successMsg.style.display = "block";
  }
};

shareBtn.addEventListener('click', () => {
  if (shareCount < maxShare) {
    shareCount++;
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const url = `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
    counterText.innerText = `Click count: ${shareCount}/${maxShare}`;

    if (shareCount === maxShare) {
      alert("✅ Sharing complete. Please continue.");
    }
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < maxShare) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const email = form.email.value.trim();
  const college = form.college.value.trim();
  const file = document.getElementById('fileUpload').files[0];

  if (!file) {
    alert("Please upload a screenshot or file.");
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('college', college);
  formData.append('file', file);

  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwhuGG3_qAiE926CY8t-ASRwRv7eirOFjsohnBZHP6aHkirp8DSaDaDDbBYx_wF5h6l/exec';
  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: formData
    });

    const resultText = await res.text();
    console.log(resultText);

    successMsg.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    successMsg.style.display = "block";
    disableForm();
    localStorage.setItem("submitted", "true");

  } catch (err) {
    alert("Submission failed. Please try again.");
    console.error(err);
  }
});

function disableForm() {
  document.querySelectorAll('input, button').forEach(el => el.disabled = true);
}
