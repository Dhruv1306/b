// Footer JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Update current year
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Back to top functionality
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Update statistics (if data is available)
  updateFooterStats();
});

function updateFooterStats() {
  // Update total students count
  const studentRows = document.querySelectorAll("tbody tr");
  const totalStudents = studentRows.length;
  const totalStudentsElement = document.getElementById("totalStudents");
  if (totalStudentsElement) {
    totalStudentsElement.textContent = totalStudents;
  }

  // Calculate average marks
  if (totalStudents > 0) {
    let totalMarks = 0;
    let validMarks = 0;

    studentRows.forEach((row) => {
      const marksCell = row.cells[4]; // Marks column
      if (marksCell) {
        const marksText = marksCell.textContent.replace("%", "");
        const marks = parseFloat(marksText);
        if (!isNaN(marks)) {
          totalMarks += marks;
          validMarks++;
        }
      }
    });

    if (validMarks > 0) {
      const avgMarks = (totalMarks / validMarks).toFixed(1);
      const avgMarksElement = document.getElementById("avgMarks");
      if (avgMarksElement) {
        avgMarksElement.textContent = avgMarks + "%";
      }
    } else {
      const avgMarksElement = document.getElementById("avgMarks");
      if (avgMarksElement) {
        avgMarksElement.textContent = "0%";
      }
    }
  } else {
    const avgMarksElement = document.getElementById("avgMarks");
    if (avgMarksElement) {
      avgMarksElement.textContent = "0%";
    }
  }
}
