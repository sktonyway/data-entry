
document.getElementById("dob").addEventListener("change", function () {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    // adjust if birthday hasn't come yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    document.getElementById("age").value = age >= 0 ? age : "";
});

const form = document.getElementById("employeeForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      alert("Form submitted successfully!");
      form.reset();
    } else {
      alert("Error saving data!");
    }
  } catch (err) {
    console.error(err);
    alert("Server error!");
  }
});

