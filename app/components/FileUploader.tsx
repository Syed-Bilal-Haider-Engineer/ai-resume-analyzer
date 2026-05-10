import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function FileUploader({
  onFileSelect,
}: {
  onFileSelect?: (file: File) => void;
}) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        if (onFileSelect) {
          onFileSelect(selectedFile);
        }
      }
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024, // 20 MB
    });

  const file = acceptedFiles.length > 0 ? acceptedFiles[0] : null;

  return (
    <div className="w-full gradient-border">
      <div {...getRootProps()}>
        {file ? (
          <div
            className="uploader-selected-file"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3">
              <img src="/images/pdf.png" alt="File Icon" className="size-10" />
              <div>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {file.name}
                </p>

                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button className="p-2 cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onFileSelect?.(null as unknown as File);
            }}>
                <img src="/icons/cross.svg" alt="remove Icon" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-4 cursor-pointer mb-2 flex justify-center items-center">
              <img
                src="/icons/info.svg"
                alt="Upload Icon"
                className="size-12"
              />
            </div>
            <p className="text-lg text-gray-500">
              <span className="font-semibold">click to upload</span> or drag and
              drop
            </p>

            <p className="text-sm text-gray-500">PDF (max 20 MB)</p>
          </div>
        )}

        <input {...getInputProps()} />
      </div>
    </div>
  );
}

export default FileUploader;
