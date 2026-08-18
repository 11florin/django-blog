const editButtons = document.getElementsByClassName("btn-edit");
const commentText = document.getElementById("id_body");
const commentForm = document.getElementById("commentForm");
const submitButton = document.getElementById("submitButton");
const deleteModalElement = document.getElementById("deleteModal");
const deleteModal = deleteModalElement
  ? new bootstrap.Modal(deleteModalElement)
  : null;
const deleteButtons = document.getElementsByClassName("btn-delete");
const deleteConfirm = document.getElementById("deleteConfirm");

/**
 * Initializes edit functionality for the provided edit buttons.
 *
 * For each button in the `editButtons` collection:
 * - Retrieves the associated comment's ID upon click.
 * - Fetches the content of the corresponding comment.
 * - Populates the `commentText` input/textarea with the comment's content for editing.
 * - Updates the submit button's text to "Update".
 * - Sets the form's action attribute to the `edit_comment/{commentId}` endpoint.
 */
if (commentText && commentForm && submitButton) {
  for (let button of editButtons) {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const commentId = button.getAttribute("data-comment_id");
      const commentElement = document.getElementById(`comment${commentId}`);

      if (!commentElement) {
        return;
      }

      const commentContent = commentElement.innerText.trim();
      const currentPath = window.location.pathname.replace(/\/$/, "");

      commentText.value = commentContent;
      submitButton.textContent = "Update";
      commentForm.setAttribute(
        "action",
        `${currentPath}/edit_comment/${commentId}`,
      );
      commentForm.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

/**
 * Initializes deletion functionality for the provided delete buttons.
 *
 * For each button in the `deleteButtons` collection:
 * - Retrieves the associated comment's ID upon click.
 * - Updates the `deleteConfirm` link's href to point to the
 * deletion endpoint for the specific comment.
 * - Displays a confirmation modal (`deleteModal`) to prompt
 * the user for confirmation before deletion.
 */
if (deleteModal && deleteConfirm) {
  for (let button of deleteButtons) {
    button.addEventListener("click", (e) => {
      const commentId = button.getAttribute("data-comment_id");
      deleteConfirm.href = `${window.location.pathname.replace(/\/$/, "")}/delete_comment/${commentId}`;
      deleteModal.show();
    });
  }
}
