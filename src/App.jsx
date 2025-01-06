import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const App = () => {
  // State management for text copying and clipboard status
  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  // Speech recognition configuration
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const stopListening = () => SpeechRecognition.stopListening();

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Handle unsupported browsers
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="unsupported-browser">
        <h2>
          Your browser does not support speech recognition. Please try a modern
          browser.
        </h2>
      </div>
    );
  }

  return (
    <>
      <section className="container-fluid bg">
        {/* Title Section */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center mt-5" style={{ color: "#FF9D23" }}>
                Speech to Text Converter
              </h1>
            </div>
          </div>
        </div>

        {/* Transcript Display and Controls */}
        <div
          className="container d-flex flex-column justify-content-center align-items-center  rounded-4 mt-3 p-3"
          style={{ border: "6px solid #F0BB78" }}
          onClick={() => setTextToCopy(transcript)}
        >
          {/* Display Transcribed Text */}
          <p className="transcript-text text-white fs-4 mb-4">
            {transcript || "Start speaking to see the transcript here..."}
          </p>

          {/* Action Buttons */}
          <div className="container w-100 d-flex justify-content-center align-items-center mt-5">
            <div className="row">
              {/* Copy to Clipboard Button */}
              <div className="col-4">
                <button
                  className="btn btn-warning"
                  onClick={setCopied}
                  aria-label="Copy transcript to clipboard"
                >
                  {isCopied ? "Copied!" : "Copy "}
                </button>
              </div>

              {/* Start Listening Button */}
              <div className="col-4">
                <button
                  className="btn btn-success"
                  onClick={startListening}
                  aria-label="Start speech recognition"
                >
                  {listening ? "Listening." : "Start"}
                </button>
              </div>

              {/* Stop Listening Button */}
              <div className="col-4">
                <button
                  className="btn btn-danger"
                  onClick={stopListening}
                  aria-label="Stop speech recognition"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: "350px" }}>
        <h6 className="text-center fs-bold  text-white">
          Made By Hanzala Arshad{" "}
        </h6>
      </footer>
    </>
  );
};

export default App;
