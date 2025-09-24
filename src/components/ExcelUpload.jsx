import React, { useState } from "react";

import { uploadAndSendFile } from "../api/apiService.js";
import "./ExcelUpload.css";

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadAndSend = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", file);

    setLoading(true);
    setMessage("");

    try {
      const responseData = await uploadAndSendFile(formData);

      const { successCount, failedCount, successEmails, failedEmails } =
        responseData;

      let detailedMessage = responseData.message;
      if (successEmails && successEmails.length > 0) {
        detailedMessage += `\n\n✅ Successfully sent to:\n${successEmails
          .slice(0, 10)
          .map((email) => `• ${email}`)
          .join("\n")}`;
        if (successEmails.length > 10) {
          detailedMessage += `\n• ... and ${successEmails.length - 10} more`;
        }
      }
      if (failedEmails && failedEmails.length > 0) {
        detailedMessage += `\n\n❌ Failed: ${failedEmails.length} emails`;
      }

      setMessage(detailedMessage);
    } catch (error) {
      const errorMessage =
        error.message || "Error uploading file or sending emails";
      setMessage(`❌ ${errorMessage}`);
    }
    setLoading(false);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="title">📧 Bulk Email Sender</h2>
        <p className="subtitle">
          Upload Excel/CSV and send emails to 100 users instantly
        </p>

        <div className="file-input-container">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="file-label">
            📁 {file ? file.name : "Choose Excel/CSV File"}
          </label>
        </div>

        <button
          onClick={handleUploadAndSend}
          disabled={loading || !file}
          className={`upload-btn ${loading ? "loading" : ""}`}
        >
          {loading
            ? "⏳ Processing & Sending..."
            : "🚀 Upload & Send Bulk Emails"}
        </button>

        {message && (
          <div
            className={`message ${
              message.includes("Error") || message.includes("❌")
                ? "error"
                : "success"
            }`}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
                margin: 0,
                fontFamily: "inherit",
              }}
            >
              {message}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelUpload;
