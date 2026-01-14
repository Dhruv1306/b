// Header JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
});

function initializeHeader() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  // Dropdown functionality
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();

        // Close other dropdowns
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("active");
          }
        });

        dropdown.classList.toggle("active");
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");
      const icon = themeToggle.querySelector("i");
      if (document.body.classList.contains("dark-theme")) {
        icon.className = "fas fa-sun";
      } else {
        icon.className = "fas fa-moon";
      }
    });
  }

  // Update header statistics
  updateHeaderStats();

  // Set active navigation link
  setActiveNavLink();
}

function updateHeaderStats() {
  // Update total students count
  const studentRows = document.querySelectorAll("tbody tr");
  const totalStudents = studentRows.length;
  const headerTotalElement = document.getElementById("headerTotalStudents");
  if (headerTotalElement) {
    headerTotalElement.textContent = totalStudents;
  }

  // Calculate average marks and top performers
  if (totalStudents > 0) {
    let totalMarks = 0;
    let validMarks = 0;
    let topPerformers = 0;

    studentRows.forEach((row) => {
      const marksCell = row.cells[4]; // Marks column
      if (marksCell) {
        const marksText = marksCell.textContent.replace("%", "");
        const marks = parseFloat(marksText);
        if (!isNaN(marks)) {
          totalMarks += marks;
          validMarks++;
          if (marks >= 85) {
            topPerformers++;
          }
        }
      }
    });

    if (validMarks > 0) {
      const avgMarks = (totalMarks / validMarks).toFixed(1);
      const headerAvgElement = document.getElementById("headerAvgMarks");
      if (headerAvgElement) {
        headerAvgElement.textContent = avgMarks + "%";
      }
    }

    const headerTopElement = document.getElementById("headerTopPerformers");
    if (headerTopElement) {
      headerTopElement.textContent = topPerformers;
    }
  } else {
    const headerAvgElement = document.getElementById("headerAvgMarks");
    const headerTopElement = document.getElementById("headerTopPerformers");
    if (headerAvgElement) headerAvgElement.textContent = "0%";
    if (headerTopElement) headerTopElement.textContent = "0";
  }
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (
      link.getAttribute("href") === currentPath ||
      (currentPath === "/" && link.getAttribute("data-section") === "home")
    ) {
      link.classList.add("active");
    }
  });
}

function performGlobalSearch() {
  const searchInput = document.getElementById("globalSearch");
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (!searchTerm) return;

  // Filter the table based on search term
  const tableRows = document.querySelectorAll("tbody tr");
  tableRows.forEach((row) => {
    const cells = row.getElementsByTagName("td");
    let found = false;

    for (let cell of cells) {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        found = true;
        break;
      }
    }

    row.style.display = found ? "" : "none";
  });

  // Show notification
  showNotification(`Search results for "${searchTerm}"`, "info");
}

function exportData() {
  // Export functionality
  const students = [];
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const cells = row.cells;
    if (cells.length >= 5) {
      students.push({
        "Serial No": cells[0].textContent,
        Name: cells[1].textContent,
        Age: cells[2].textContent,
        Class: cells[3].textContent,
        Marks: cells[4].textContent,
      });
    }
  });

  const csvContent =
    "data:text/csv;charset=utf-8," +
    Object.keys(students[0] || {}).join(",") +
    "\n" +
    students.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "students_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showNotification("Data exported successfully!", "success");
}

function showStats() {
  const totalStudents = document.querySelectorAll("tbody tr").length;
  const avgMarks = document.getElementById("headerAvgMarks").textContent;
  const topPerformers = document.getElementById(
    "headerTopPerformers"
  ).textContent;

  alert(
    `📊 Student Statistics:\n\n` +
      `Total Students: ${totalStudents}\n` +
      `Average Marks: ${avgMarks}\n` +
      `Top Performers (85%+): ${topPerformers}`
  );
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    showNotification("Logging out...", "info");
    // Add logout logic here
  }
}

function showNotification(message, type = "info") {
  // Simple notification system
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: ${
      type === "success" ? "#48bb78" : type === "error" ? "#e53e3e" : "#4facfe"
    };
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Update stats when page content changes
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      updateHeaderStats();
    }
  });
});

// Start observing
if (document.querySelector("tbody")) {
  observer.observe(document.querySelector("tbody"), {
    childList: true,
    subtree: true,
  });
}
