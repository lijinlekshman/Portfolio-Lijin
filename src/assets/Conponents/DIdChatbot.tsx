import React, { useState } from "react";
import axios from "axios";

const DIdChatbot = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Please enter some text");

    setLoading(true);

    try {
      const apiKey = "bGlqaW5sZWtzaG1hbjFAZ21haWwuY29t";
      const apiSecret = "8qh609Rx4ccJl5IPHG1PD";
      const auth = btoa(`${apiKey}:${apiSecret}`); // Base64 encode

      const response = await axios.post(
        "https://api.d-id.com/talks",
        {
          script: {
            type: "text",
            input: text,
            provider: {
              type: "microsoft",
              voice_id: "en-US-JennyNeural",
            },
          },
          config: {
            fluent: true,
            pad_audio: 0.2,
          },
          source_url:
            "https://create-images-results.d-id.com/default-avatar.png",
        },
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
        }
      );

      const talkId = response.data.id;

      // Poll for result
      const pollResult = async () => {
        try {
          const result = await axios.get(
            `https://api.d-id.com/talks/${talkId}`,
            {
              headers: {
                Authorization: `Basic ${auth}`,
              },
            }
          );

          if (result.data.result_url) {
            setVideoUrl(result.data.result_url);
            setLoading(false);
          } else {
            setTimeout(pollResult, 2000); // Retry after 2 seconds
          }
        } catch (err) {
          console.error("Error polling result:", err);
          setLoading(false);
        }
      };

      pollResult();
    } catch (err) {
      console.error("Error creating avatar:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>D-ID Talking Avatar</h2>
      <textarea
        value={text}
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {videoUrl && (
        <div className="mt-4">
          <h3>Video Response:</h3>
          <video src={videoUrl} controls autoPlay width="400" />
        </div>
      )}
    </div>
  );
};

export default DIdChatbot;
