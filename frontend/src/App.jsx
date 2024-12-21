import { useEffect, useState, useRef } from "react";

function App() {
  const [text, setText] = useState('');
  const socketRef = useRef(null); // Use useRef to persist the WebSocket instance

  useEffect(() => {
    // Initialize WebSocket connection
    // socketRef.current = new WebSocket('ws://localhost:3000/api/editor');
    socketRef.current = new WebSocket('ws://192.168.1.52:3000/api/editor');
    
    socketRef.current.onmessage = (event) => {
      try {
        console.log('Raw Event Data:', event.data);

        // Parse the event data (JSON string)
        const parsedData = JSON.parse(event.data);
        console.log('Parsed Data:', parsedData);

        // Extract and decode the Buffer
        const bufferData = parsedData.text.data; // Access the "data" array
        const decodedString = String.fromCharCode(...bufferData); // Convert array to string

        console.log('Decoded String:', decodedString);
        setText(decodedString); // Update state with the decoded string
    } catch (error) {
        console.error('Error processing WebSocket message:', error);
    }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      socketRef.current.close();
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle text change and send it via WebSocket
  function handleTextChange(e) {
    const newValue = e.target.value;
    setText(newValue);
    
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log('Sending message:', newValue);
        socketRef.current.send(newValue);
    } else {
        console.error('WebSocket is not open, unable to send message');
    }
  }

  return (
    <div>
      <h1>Collaborative Text Editor!!</h1>
      <textarea value={text} onChange={handleTextChange}></textarea>
    </div>
  );
}

export default App;
