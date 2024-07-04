    // Variable to track the locked/unlocked state of the website
    let isLocked = true;

    // DOM elements references
    let lock_button = document.getElementById("lock-button");
    let initial_message = document.getElementById("initial_message");

    // Function to initiate voice recognition
    function startVoiceRecognition() {
      // Create a new SpeechRecognition object
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      // Set language to English (United States)
      recognition.lang = 'en-US';

       // Disable interim results to only get final results
      recognition.interimResults = false;

       // Event handler for recognized speech
      recognition.onresult = function(event) {

         // Extract the recognized transcript and convert to lowercase
        const transcript = event.results[0][0].transcript.toLowerCase();

        // Check if the transcript includes the specific phrase 'hello unlock it'
        if (transcript.includes('open it')) {
          // Call the unlockWebsite function if the phrase is detected
          unlockWebsite();
        }
      };
       
  // Event handler for recognition errors
      recognition.onerror = function(event) {
        alert('Error during voice recognition. Please try again.'); // Display an alert notifying the user about the recognition error
        console.error(event);
      };
        // Event handler for the end of recognition
      recognition.onend = function() {
         // Check if the recognition is still locked, if so, display an alert
        if (isLocked) {
          alert('Voice command not recognized. Please try again.');
        }
      };
        // Start the speech recognition process
      recognition.start();
    };
    // Function to unlock the website

    function unlockWebsite() {
       // Set the locked state to false
      isLocked = false;
      // Hide the 'Open' button and display the content
      document.getElementById('lockButton').style.display = 'none';
      document.getElementById('content').style.display = 'block';

       // Create a 'Lock' button and append it to the designated element
      const lockButton = document.createElement('div');
      lockButton.id = 'unlockButton';
      lockButton.innerHTML = 'Lock';
      lockButton.onclick = lockWebsite;

      lock_button.appendChild(lockButton);

       // Hide the initial message
      initial_message.style.display = 'none';

      alert('Website unlocked! You can now enjoy the content.');  // Display an alert notifying the user about the website unlock
    };

    // Function to lock the website

    function lockWebsite() {
       // Set the locked state to true
      isLocked = true;
        // Show the 'Open' button and hide the content
      document.getElementById('lockButton').style.display = 'block';
      document.getElementById('content').style.display = 'none';
      
      // Remove the 'Lock' button
      document.getElementById('unlockButton').remove();
      alert('Website locked! Click the "Open" button to unlock.');// Display an alert notifying the user about the website lock
      initial_message.style.display = 'block'; // Show the initial message
    };

    
    