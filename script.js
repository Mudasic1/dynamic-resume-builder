function updateResume() {
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const about = document.getElementById('about').value;
  const skills = document.getElementById('skills').value.split(',');

  if (!name || !email || !phone || !address || !about || skills.length === 0 || skills[0] === '') {
    alert("Please fill out all the fields before generating your resume.");
    return; 
  }

  // Update the preview section if validation passes
  document.getElementById('preview-name').textContent = name;
  document.getElementById('preview-email').textContent = email;
  document.getElementById('preview-phone').textContent = phone;
  document.getElementById('preview-address').textContent = address;

  // Update the about section
  document.getElementById('preview-about').textContent = about;

  // Update skills
  const skillsList = document.getElementById('preview-skills');
  skillsList.innerHTML = ''; // Clear previous skills
  skills.forEach(skill => {
    if (skill.trim()) {
      const listItem = document.createElement('li');
      listItem.textContent = skill.trim();
      skillsList.appendChild(listItem);
    }
  });

  // Profile image update
  const profileImgInput = document.getElementById('profile-img');
  if (profileImgInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('preview-img').src = e.target.result;
      document.getElementById('preview-img').style.display = 'block';
    };
    reader.readAsDataURL(profileImgInput.files[0]);
  } else {
    alert("Please upload a profile image.");
  }
}

function downloadResume() {
  // Get preview data
  const name = document.getElementById('preview-name').textContent;
  const email = document.getElementById('preview-email').textContent;
  const phone = document.getElementById('preview-phone').textContent;
  const address = document.getElementById('preview-address').textContent;
  const about = document.getElementById('preview-about').textContent;
  const skillsList = document.getElementById('preview-skills');
  const skills = Array.from(skillsList.getElementsByTagName('li')).map(li => li.textContent);

  // Create a new jsPDF instance
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add content to the PDF
  doc.setFont('helvetica');
  doc.setFontSize(16);
  doc.text(`Name: ${name}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Phone: ${phone}`, 10, 40);
  doc.text(`Address: ${address}`, 10, 50);

  // Add about section
  doc.text('About Me:', 10, 60);
  doc.setFontSize(12);
  doc.text(about, 10, 70);

  // Add skills section
  doc.setFontSize(14);
  doc.text('Skills:', 10, 90);
  doc.setFontSize(12);
  skills.forEach((skill, index) => {
    doc.text(`- ${skill}`, 10, 100 + (index * 10));
  });

  // Add profile image (if available)
  const profileImg = document.getElementById('preview-img');
  if (profileImg.src) {
    const imgData = profileImg.src;
    doc.addImage(imgData, 'JPEG', 150, 20, 40, 40); // Image positioned and scaled
  }

  // Save the PDF
  doc.save(`${name}_resume.pdf`);
}
