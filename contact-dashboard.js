// Function to fetch data from the server and populate the dashboard
const fetchData = async () => {
    // getting input and fetching data
    const input = document.getElementById('fetchInput').value;
    const fetchBtn = document.getElementById('fetchBtn');
    fetchBtn.disabled = true;
    const response = await fetch(`https://xceedesigns-backend.vercel.app/contact/fetch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminAuth: input })
    });
    
    // modal with an error message
    if (response.status === 401) {
        const modalTitle = document.querySelector('.modal-title');
        modalTitle.textContent = 'XceeDesigns LLC.';
        modalTitle.style.fontWeight = 'bold';
        const modalBody = document.querySelector('.modal-body');
        modalBody.textContent = 'Authentication failed, please try again.';
        $('#myModal').modal('show');
        fetchBtn.disabled = false;
        return;
    }
    // parsing and creating table
    const data = await response.json();
    fetchBtn.disabled = false;
    const table = document.createElement('table');
    table.classList.add('table');

    // remove the previous table if it exists
    const previousTable = document.querySelector('table');
    if (previousTable) {
        previousTable.remove();
    }

    // table headers
    const tableHead = document.createElement('thead');
    const tableHeadRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    tableHeadRow.appendChild(nameHeader);
    const emailHeader = document.createElement('th');
    emailHeader.textContent = 'Email';
    tableHeadRow.appendChild(emailHeader);
    const messageHeader = document.createElement('th');
    messageHeader.textContent = 'Message';
    tableHeadRow.appendChild(messageHeader);
    const deleteHeader = document.createElement('th');
    deleteHeader.textContent = 'Delete';
    tableHeadRow.appendChild(deleteHeader);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);

    // table body and populating it with fetched data
    const tableBody = document.createElement('tbody');
    data.forEach(entry => {
        const tableRow = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = entry.name;
        tableRow.appendChild(nameCell);
        const emailCell = document.createElement('td');
        emailCell.textContent = entry.email;
        tableRow.appendChild(emailCell);
        const messageCell = document.createElement('td');
        messageCell.textContent = entry.message;
        messageCell.style.maxWidth = '300px';
        messageCell.style.maxHeight = '100px'; 
        messageCell.style.wordWrap = 'break-word'; 
        messageCell.style.whiteSpace = 'normal';
        tableRow.appendChild(messageCell);
        const deleteCell = document.createElement('td');
        const deleteIcon = document.createElement('div');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.textContent = '🗑️';
        deleteIcon.style.cursor = 'pointer';

        // event listener to delete an entry when delete icon is clicked
        deleteIcon.addEventListener('click', async () => {
            const res = await fetch(`https://xceedesigns-backend.vercel.app/contact/delete/${entry._id}`, {
                method: 'DELETE'
            });
            tableRow.remove();
        });
        deleteCell.appendChild(deleteIcon);
        tableRow.appendChild(deleteCell);
        tableBody.appendChild(tableRow);
    });
    table.appendChild(tableBody);

    // creating container for the table and adding to dashboard
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-responsive');
    tableContainer.appendChild(table);
    document.getElementById('dashboard').appendChild(tableContainer);
};
