import React, { useState, useRef } from "react";
import "../Styles/Doc/DocumentsBills.css";
import Header from "../Componants/Layout/Header";
import Footer from "../Componants/Layout/Footer";

// Sample file path (uploaded file in your project root). We'll use this as a demo URL.
const SAMPLE_FILE_URL = "/mnt/data/Emiregii.jsx";

export default function DocumentsBills() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [category, setCategory] = useState("Bills");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Camera refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  // Handle normal file selection
  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setTitle(f.name);
    setMessage("");
  };

  // Upload to your backend (expects multipart/form-data)
  const uploadToBackend = async () => {
    if (!file) return setMessage("Please select or scan a file first.");

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    form.append("category", category);
    form.append("date", date || new Date().toISOString().slice(0,10));

    try {
      // Replace URL with your backend upload endpoint
      const res = await fetch("/api/upload-document", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Uploaded to backend successfully.");
      } else {
        setMessage(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error while uploading.");
    } finally {
      setUploading(false);
    }
  };

  // ====== Google Drive helper (placeholder) ======
  // NOTE: Secure server-side OAuth flow required. Frontend only calls your server.
  const saveToGoogleDrive = async () => {
    if (!file) return setMessage("Select a file before saving to Google Drive.");
    setUploading(true);
    try {
      // 1) You should POST the file to your server endpoint that handles Drive upload
      // 2) Server will use Google Drive API with OAuth2 and return success
      const form = new FormData();
      form.append("file", file);
      form.append("title", title);

      const res = await fetch("/api/upload-to-drive", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Saved to Google Drive: " + (data.driveUrl || ""));
      } else {
        setMessage(data.message || "Drive upload failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error while saving to Drive.");
    } finally {
      setUploading(false);
    }
  };

  // ====== SCAN (USE CAMERA) ======
  const startScan = async () => {
    setMessage("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setScanning(true);
    } catch (err) {
      console.error("Camera error:", err);
      setMessage("Unable to access camera.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const f = new File([blob], `scan_${Date.now()}.png`, { type: "image/png" });
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setTitle(f.name);
      stopScan();
    }, "image/png");
  };

  const stopScan = () => {
    setScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Quick demo: load sample file url into preview
  const loadSample = () => {
    setPreviewUrl(SAMPLE_FILE_URL);
    setTitle("Sample: Emiregii.jsx");
    setMessage("Loaded sample file preview (local path). Use real file to upload.");
  };

  return (
    <>
    <Header/>
    <div className="docs-wrapper">
      <h1>Documents & Bills</h1>

      <div className="docs-actions">
        <div className="upload-block">
          <label className="file-label">Choose file</label>
          <input type="file" onChange={onFileChange} accept="image/*,application/pdf" />

          <label className="input-label">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Document title" />

          <label className="input-label">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Bills</option>
            <option>Receipts</option>
            <option>ID Card</option>
            <option>Agreement</option>
            <option>Others</option>
          </select>

          <label className="input-label">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <div className="action-row">
            <button onClick={uploadToBackend} disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
            <button onClick={saveToGoogleDrive} disabled={uploading}>{uploading ? "Saving..." : "Save to Google Drive"}</button>
            <button onClick={loadSample}>Load Sample</button>
          </div>

          <p className="message">{message}</p>
        </div>

        <div className="scanner-block">
          <h3>Scan Document</h3>

          {!scanning ? (
            <button onClick={startScan} className="start-scan">Start Camera</button>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline className="video-preview"></video>
              <div className="scan-actions">
                <button onClick={capturePhoto}>Capture</button>
                <button onClick={stopScan}>Stop</button>
              </div>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      </div>

      <div className="preview-block">
        <h3>Preview</h3>
        {previewUrl ? (
          // If the preview is an image or PDF, display accordingly. For local code file we show file name.
          previewUrl.endsWith(".pdf") ? (
            <iframe src={previewUrl} title="preview" className="preview-iframe" />
          ) : (
            <img src={previewUrl} alt="preview" className="preview-img" />
          )
        ) : (
          <p>No preview available. Choose or scan a file.</p>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

/*
  NOTE:
  - This component expects two backend endpoints to exist:
    1) POST /api/upload-document  -> Accepts multipart/form-data and stores file
    2) POST /api/upload-to-drive  -> Server handles Google OAuth and uploads to Drive

  - Security: Google Drive upload must be handled server-side using OAuth2. Do NOT put client secrets in frontend.
  - The SAMPLE_FILE_URL points to a local file path you uploaded earlier: /mnt/data/Emiregii.jsx
*/
