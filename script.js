document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('create-form');
    const resourceNameInput = document.getElementById('resource-name');
    const resourceList = document.getElementById('resource-list');
  
    // Function to fetch and display the resource list
    function fetchResourceList() {
      fetch('/api/resource')
        .then((response) => response.json())
        .then((resources) => {
          resourceList.innerHTML = '';
          resources.forEach((resource) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${resource.name}
              <button class="delete" data-id="${resource.id}">Delete</button>
              <button class="edit" data-id="${resource.id}">Edit</button>`;
            resourceList.appendChild(listItem);
  
            // Add event listeners for delete and edit buttons
            const deleteButton = listItem.querySelector('.delete');
            const editButton = listItem.querySelector('.edit');
            deleteButton.addEventListener('click', () => deleteResource(resource.id));
            editButton.addEventListener('click', () => editResource(resource.id, resource.name));
          });
        })
        .catch((error) => console.error('Error fetching resource list:', error));
    }
  
    // Function to create a new resource
    function createResource() {
      const name = resourceNameInput.value;
      if (!name) {
        return alert('Resource name is required');
      }
      fetch('/api/resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
        .then((response) => response.json())
        .then(() => {
          resourceNameInput.value = '';
          fetchResourceList();
        })
        .catch((error) => console.error('Error creating resource:', error));
    }
  
    // Function to delete a resource by ID
    function deleteResource(id) {
      fetch(`/api/resource/${id}`, {
        method: 'DELETE',
      })
        .then(() => fetchResourceList())
        .catch((error) => console.error('Error deleting resource:', error));
    }
  
    // Function to edit a resource
    function editResource(id, currentName) {
      const newName = prompt('Edit resource name:', currentName);
     
  