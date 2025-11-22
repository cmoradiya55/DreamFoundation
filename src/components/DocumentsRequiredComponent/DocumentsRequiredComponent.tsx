'use client';

import React, { useEffect, useState } from 'react';
import { Control, FieldError, useWatch, Controller } from 'react-hook-form';
import { FileText, Image as ImageIcon, X, Camera, FileTextIcon } from 'lucide-react';

interface DocumentOption {
  value: string;
  label: string;
}

interface FileUploadFieldProps {
  name: string;
  control: Control<any>;
  docType: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ name, control, docType }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const watchedValue = useWatch({ control, name });

  // Detect mobile/tablet devices
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent.toLowerCase());
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobileDevice(isMobile || isTablet || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update file URL when file changes
  useEffect(() => {
    const file = watchedValue as File | null;
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileUrl(null);
    }
  }, [watchedValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const file = value as File | null;
        const isImageFile = Boolean(file?.type?.startsWith('image/'));
        const shouldShowImagePreview = Boolean(fileUrl && (isImageFile || !file?.type));

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setIsDragging(false);
            onChange(selectedFile);
          }
          // Reset input value to allow selecting the same file again
          e.target.value = '';
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
          if (!isMobileDevice) {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
          }
        };

        const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
          if (!isMobileDevice) {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
          if (!isMobileDevice) {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const droppedFile = e.dataTransfer.files?.[0];
            if (droppedFile) {
              const isImageFile = droppedFile.type.startsWith('image/');
              const allowedDocumentTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
              ];
              const isDocumentFile = allowedDocumentTypes.includes(droppedFile.type);
              if (isImageFile || isDocumentFile) {
                onChange(droppedFile);
              }
            }
          }
        };

        const handleRemove = () => {
          if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
            setFileUrl(null);
          }
          onChange(null);
        };

        return (
          <div className="space-y-3">
            {!file ? (
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Single Upload Button with Drag and Drop - accepts both Image and Document */}
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                    id={`file-${docType}`}
                  />
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex lg:flex-col items-center justify-center gap-2 w-full px-4 py-6 bg-teal-50 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                      isDragging && !isMobileDevice
                        ? 'bg-teal-100 border-teal-500 border-solid scale-105'
                        : 'border-teal-300 hover:bg-teal-100 hover:border-teal-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* <ImageIcon className="w-6 h-6 text-teal-700" /> */}
                      <FileTextIcon className="w-6 h-6 text-teal-700" />
                    </div>
                    <span className="text-sm font-medium text-teal-700">
                      {isDragging && !isMobileDevice
                        ? 'Drop file here'
                        : 'Upload Image or Document'}
                    </span>
                    {!isMobileDevice && (
                      <span className="text-xs text-teal-600 -mt-1">
                        or You can also Drag and Drop the file here or Photo hear.
                      </span>
                    )}
                  </div>
                </label>

                {/* Camera Button for Mobile/Tablet */}
                {isMobileDevice && (
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                      id={`camera-${docType}`}
                    />
                    {/* {isMobileDevice ? (
                      <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-50 border-2 border-dashed border-green-300 rounded-lg cursor-pointer hover:bg-green-100 hover:border-green-400 transition-colors">
                        <Camera className="w-5 h-5 text-green-700" />
                        <span className="text-sm font-medium text-green-700">
                          Take Photo
                        </span>
                      </div>
                    ) : null} */}
                  </label>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {shouldShowImagePreview ? (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                      src={fileUrl ?? ''}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-teal-100 rounded-lg">
                    {isImageFile ? (
                      <ImageIcon className="w-8 h-8 text-teal-700" />
                    ) : (
                      <FileText className="w-8 h-8 text-teal-700" />
                    )}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex-shrink-0 p-2 text-teal-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

interface DocumentsRequiredComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  options: DocumentOption[];
  title?: string;
  name?: string;
}

const DocumentsRequiredComponent: React.FC<DocumentsRequiredComponentProps> = ({
  control,
  errors,
  options,
  title = 'Documents Required',
  name = 'documents',
}) => {
  return (
    <div>
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
        • {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Controller
          name={name}
          control={control}
          rules={{ required: 'Please select at least one document' }}
          render={({ field }) => {
            const selectedValues = field.value || [];

            const handleCheckboxChange = (optionValue: string, isChecked: boolean) => {
              if (isChecked) {
                const newValue = [...selectedValues, optionValue];
                field.onChange(newValue);
              } else {
                const newValue = selectedValues.filter((value: string) => value !== optionValue);
                field.onChange(newValue);
              }
            };

            return (
              <div className="space-y-2">
                {options.map((option) => {
                  const isChecked = selectedValues.includes(option.value);
                  const uploadFieldName = `documentFiles.${option.value}`;

                  return (
                    <div key={option.value} className="space-y-2">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                          className="w-4 h-4 cursor-pointer border-2 border-teal-700 rounded transition-all accent-teal-600 lg:focus:ring-2 lg:focus:ring-teal-200"
                        />
                        <span className={`ml-3 text-sm font-medium transition-colors ${
                          isChecked
                            ? 'text-teal-700 font-semibold'
                            : 'text-gray-700 group-hover:text-teal-600'
                        }`}>
                          {option.label}
                        </span>
                      </label>
                      
                      {/* Upload section appears directly below the selected option */}
                      {isChecked && (
                        <div className="ml-7 mt-2 mb-4 bg-white rounded-xl border-2 border-teal-100 p-4 sm:p-5 shadow-sm">
                          <FileUploadField
                            name={uploadFieldName}
                            control={control}
                            docType={option.value}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </div>
      {errors && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {Array.isArray(errors) ? errors[0]?.message : (errors as FieldError)?.message}
        </p>
      )}
    </div>
  );
};

export default DocumentsRequiredComponent;

