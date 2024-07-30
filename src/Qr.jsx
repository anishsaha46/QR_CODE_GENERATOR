import { useState } from "react";

const Qr = () => {
    const [url, setUrl] = useState("");
    const [size, setSize] = useState(200);
    const [foregroundColor, setForegroundColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [qrUrl, setQrUrl] = useState("");
  
    const handleChange = (e) => {
      e.preventDefault();
      if (!url || !url.startsWith("http")) {
        setError("Please enter a valid URL starting with http or https.");
        setShow(false);
      } else {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}&color=${foregroundColor.substring(1)}&bgcolor=${backgroundColor.substring(1)}`;
        setQrUrl(qrUrl);
        setShow(true);
        setError("");
      }
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = qrUrl;
        link.download = "qr_code.png";
        link.click();
      };
  
    return (
      <div className="container">
        <form onSubmit={handleChange}>
          <input
            type="url"
            name="url"
            placeholder="Enter the URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="number"
            name="size"
            placeholder="Size (e.g., 200)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="color"
            name="foregroundColor"
            value={foregroundColor}
            onChange={(e) => setForegroundColor(e.target.value)}
          />
          <input
            type="color"
            name="backgroundColor"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <button type="submit">Generate</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {show && (
          <div>
            <img alt="QR Code" src={qrUrl} />
            <button onClick={handleDownload}>Download</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Qr;
