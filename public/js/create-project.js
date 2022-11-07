const deleteBtns = document.querySelectorAll('.delete-btn')
console.log(deleteBtns)

const createFormHandler = async (event) => {
    // TODO: Add a comment describing the functionality of this statement
    event.preventDefault();
  
    // TODO: Add a comment describing the functionality of these expressions
    const name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-description').value.trim();
    const needed_funding = document.querySelector('#needed-funding').value.trim();
  
    if (name && description && needed_funding) {
      // TODO: Add a comment describing the functionality of this expression
      const response = await fetch('/api/projects/', {
        method: 'POST',
        body: JSON.stringify({ name, description, needed_funding }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to log in');
      }
    }
  };


  
  document
    .querySelector('.create-form')
    .addEventListener('submit', createFormHandler);

  deleteBtns.forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-project-id')
      console.log(id)
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to log in');
      }
    })
  })

