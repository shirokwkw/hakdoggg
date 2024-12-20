        // Prevent the input from resetting when clicked
        document.getElementById('search-input').addEventListener('click', function(event) {
            event.stopPropagation();
        });

        // Navigate to countdown.html when the search icon is clicked
        function navigateToNext() {
            window.location.href = 'countdown.html';
        }

        document.getElementById('search-icon').addEventListener('click', navigateToNext);