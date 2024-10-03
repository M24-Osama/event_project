let logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
  localStorage.setItem("loggedInUser", "");
  window.location.href = "Login.html";
});

let adminData = JSON.parse(localStorage.getItem("adminData")) || [];
let cardContainer = document.getElementById("tableEvent");
let color = true;

// Load SweetAlert
const script = document.createElement("script");
script.src = "https://unpkg.com/sweetalert/dist/sweetalert.min.js";
document.head.appendChild(script);

// Fetch formData from local storage
let formData = JSON.parse(localStorage.getItem("formData")) || [];

// Populate Messages Table
function populateTableMessages() {
  const tableBody = document.querySelector("#tableMessages tbody");
  tableBody.innerHTML = ""; // Clear existing content

  formData.forEach((message, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td class="thw10">${index + 1}</td>
            <td class="thw20">${message.name}</td>
            <td class="thw20">${message.email}</td>
            <td class="thw20">${message.comment}</td>
            <td class="thw10">
                <div class="btnEvent red delete-button" data-name="${
                  message.name
                }">
                    <span class="bi bi-trash-fill" style="color: white;"></span>
                </div>
            </td>
        `;
    tableBody.appendChild(tr);

    // Delete button functionality
    tr.querySelector(".delete-button").addEventListener("click", () => {
      swal({
        title: "Delete",
        text: "Are you sure you want to delete this message?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteMessageByName(message.name);
          tr.remove();
          swal("Delete", "Message has been deleted successfully!", "success");
        }
      });
    });
  });
}

// Call the function on page load to populate the table
populateTableMessages();

// Delete Function for messages
function deleteMessageByName(name) {
  formData = formData.filter((message) => message.name !== name);
  localStorage.setItem("formData", JSON.stringify(formData));
  populateTableMessages(); // Refresh messages table
}
