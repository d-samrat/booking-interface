document.addEventListener("DOMContentLoaded", function() {
  const seatMap = generateSeatMap();
  const seatContainer = document.querySelector('.seat-map');
  const bookButton = document.getElementById('book-btn');
  const popup = document.getElementById('popup');
  const seatSelectionPopup = document.getElementById('seat-selection-popup');

  seatContainer.innerHTML = seatMap;

  seatContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat')) {
      if (!e.target.classList.contains('booked')) {
        toggleSeatSelection(e.target);
        updateBookButtonText();
        showSeatSelectionPopup();
      } else {
        handleBookedSeatClick(e.target);
        updateBookButtonText();
      }
    }
  });

  bookButton.addEventListener('click', function() {
    bookSelectedSeats();
    updateBookButtonText();
    showPopup('Thanks for booking!');
    hideSeatSelectionPopup(); // Hide seat selection popup when booking is confirmed
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      bookButton.click();
    }
  });

  function generateSeatMap() {
    let seatMapHTML = '';
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB'];
    const seatsPerRow = [32, 28, 28, 28, 28, 28, 28, 20, 20, 20, 20, 20, 20, 20, 20, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 26, 22];
    
    for (let i = 0; i < rows.length; i++) {
      let rowClass = '';
      if (rows[i] === 'O') {
        rowClass = 'row-O'; // Add class for row 'O'
      }

      seatMapHTML += `<div class="row ${rowClass}">`;
      seatMapHTML += `<div class="row-name">${rows[i]}</div>`;
      
      // Add offset for rows H to O
      if (['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].includes(rows[i])) {
        seatMapHTML += `<div class="offset"></div>`.repeat(4); // Add 4 offset divs for rows H to O
      }
      
      // Add offset for AA row
      if (rows[i] === 'AA') {
        seatMapHTML += `<div class="offset"></div>`; // Add 1 offset div for AA row
      }

      // Add offset for AB row
      if (rows[i] === 'AB') {
        seatMapHTML += `<div class="offset"></div>`.repeat(3); // Add 3 offset divs for AB row
      }

      for (let j = 1; j <= seatsPerRow[i]; j++) {
        seatMapHTML += `<div class="seat" data-seat="${rows[i]}${j}" data-click-count="0">${j}</div>`;
        
        // Add a gap after specific seats
        if ((rows[i] === 'H' && j === 10) ||
            (['I', 'J', 'K', 'L', 'M', 'N', 'O'].includes(rows[i]) && j === 10)) {
          seatMapHTML += `<div class="gap"></div>`;
        } else if (rows[i] === 'O' && j === seatsPerRow[i]) {
          seatMapHTML += `<div class="gap"></div>`; // Add an extra gap after the last seat of row 'O'
        } else if ((rows[i] === 'B' && j === 14) || // Adjusted for AB row shift
                   (rows[i] === 'C' && j === 14) ||
                   (rows[i] === 'D' && j === 14) ||
                   (rows[i] === 'E' && j === 14) ||
                   (rows[i] === 'F' && j === 14) ||
                   (rows[i] === 'G' && j === 14) ||
                   (rows[i] === 'P' && j === 14) ||
                   (rows[i] === 'Q' && j === 14) ||
                   (rows[i] === 'R' && j === 14) ||
                   (rows[i] === 'S' && j === 14) ||
                   (rows[i] === 'T' && j === 14) ||
                   (rows[i] === 'U' && j === 14) ||
                   (rows[i] === 'V' && j === 14) ||
                   (rows[i] === 'W' && j === 14) ||
                   (rows[i] === 'X' && j === 14) ||
                   (rows[i] === 'Y' && j === 14) ||
                   (rows[i] === 'Z' && j === 14) ||
                   (rows[i] === 'AA' && j === 13) || // Set the gap between AA13 and AA14
                   (rows[i] === 'AB' && j === 11)) {
          seatMapHTML += `<div class="gap"></div>`;
        }
      }
      
      seatMapHTML += `</div>`;
    }
    
    return seatMapHTML;
  }

  function toggleSeatSelection(seat) {
    seat.classList.toggle('selected');
  }

  function bookSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    selectedSeats.forEach(seat => {
      seat.classList.remove('selected');
      seat.classList.add('booked');
      seat.dataset.clickCount = '0'; // Reset click count on booking
    });
  }

  function handleBookedSeatClick(seat) {
    let clickCount = parseInt(seat.dataset.clickCount, 10);
    clickCount++;
    if (clickCount >= 4) {
      seat.classList.remove('booked');
      seat.dataset.clickCount = '0'; // Reset click count
    } else {
      seat.dataset.clickCount = clickCount;
    }
  }

  function updateBookButtonText() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const count = selectedSeats.length;
    if (count === 0) {
      bookButton.textContent = 'BOOK';
    } else {
      bookButton.textContent = `${count} seat${count > 1 ? 's' : ''} selected`;
    }
  }

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.add('show');

    // Hide the popup after 2 seconds
    setTimeout(function() {
      popup.classList.remove('show');
    }, 2000);
  }

  function showSeatSelectionPopup() {
    const selectedSeats = document.querySelectorAll('.seat.selected:not(.booked)');
    let seatNumbers = Array.from(selectedSeats).map(seat => seat.dataset.seat).join(', ');
    seatSelectionPopup.textContent = `Seats selected: ${seatNumbers}`;
    seatSelectionPopup.classList.add('show');
  }

  function hideSeatSelectionPopup() {
    seatSelectionPopup.classList.remove('show');
  }
});
