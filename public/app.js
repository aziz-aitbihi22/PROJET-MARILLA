const API_URL = '/api/rooms';
let isEditing = false;

// DOM Elements
const roomsTableBody = document.getElementById('rooms-table-body');
const totalRoomsEl = document.getElementById('total-rooms');
const availableRoomsEl = document.getElementById('available-rooms');
const modal = document.getElementById('room-modal');
const roomForm = document.getElementById('room-form');
const modalTitle = document.getElementById('modal-title');

// Form inputs
const idInput = document.getElementById('room-id');
const numberInput = document.getElementById('roomNumber');
const typeInput = document.getElementById('roomType');
const priceInput = document.getElementById('roomPrice');
const descInput = document.getElementById('roomDescription');
const availableInput = document.getElementById('roomAvailable');

// Fetch and display rooms
async function fetchRooms() {
    try {
        const response = await fetch(API_URL);
        const rooms = await response.json();
        
        // Update stats
        totalRoomsEl.textContent = rooms.length;
        availableRoomsEl.textContent = rooms.filter(r => r.isAvailable).length;

        // Render table
        roomsTableBody.innerHTML = rooms.map(room => `
            <tr>
                <td><strong>${room.roomNumber}</strong></td>
                <td>${room.type}</td>
                <td>$${room.price}</td>
                <td>
                    <span class="status-badge ${room.isAvailable ? 'status-available' : 'status-booked'}">
                        ${room.isAvailable ? 'Available' : 'Booked'}
                    </span>
                </td>
                <td>
                    <button class="btn-edit" onclick='editRoom(${JSON.stringify(room)})'>
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button class="btn-danger" onclick="deleteRoom('${room._id}')">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
}

// Open modal
function openModal() {
    isEditing = false;
    modalTitle.textContent = 'Add New Room';
    roomForm.reset();
    idInput.value = '';
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
}

// Edit room (populate form)
function editRoom(room) {
    isEditing = true;
    modalTitle.textContent = 'Edit Room';
    
    idInput.value = room._id;
    numberInput.value = room.roomNumber;
    typeInput.value = room.type;
    priceInput.value = room.price;
    descInput.value = room.description || '';
    availableInput.checked = room.isAvailable;
    
    modal.style.display = 'flex';
}

// Save room (Create or Update)
roomForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const roomData = {
        roomNumber: numberInput.value,
        type: typeInput.value,
        price: Number(priceInput.value),
        description: descInput.value,
        isAvailable: availableInput.checked
    };

    try {
        if (isEditing) {
            await fetch(`${API_URL}/${idInput.value}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData)
            });
        }
        
        closeModal();
        fetchRooms();
    } catch (error) {
        console.error('Error saving room:', error);
        alert('Error saving room. Please check the console.');
    }
});

// Delete room
async function deleteRoom(id) {
    if (confirm('Are you sure you want to delete this room?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            fetchRooms();
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    }
}

// Initialize
fetchRooms();
