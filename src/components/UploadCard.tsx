import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface UploadCardProps {
  title: string;
  icon: React.ReactNode;
  acceptedFiles: string;
  delay: number;
  onFileUpload: (file: File) => void;
  selectedFile: File | null;
}

const UploadCard: React.FC<UploadCardProps> = ({ title, icon, acceptedFiles, delay, onFileUpload, selectedFile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
      }
    );
  }, [delay]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileUpload(file);
      if (inputRef.current) {
        // Create a new FileList containing the dropped file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      ref={cardRef}
      className="group relative w-full max-w-sm rounded-xl bg-black/30 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-black/40"
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ffffff20] to-[#ffffff10] p-[1px]">
        <div className="h-full w-full rounded-xl bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="text-4xl text-wheat/80 transition-colors duration-300 group-hover:text-wheat">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        
        {/* Upload Input */}
        <div
          className="mt-2 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-black/20 transition-all duration-300 hover:border-wheat/50 hover:bg-black/30"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center p-4 text-center">
            {selectedFile ? (
              <>
                <p className="text-sm text-[#00fff7]">File selected:</p>
                <p className="mt-1 text-sm text-white/70 truncate max-w-full">
                  {selectedFile.name}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-white/70">Click or drag file to upload</p>
                <p className="mt-1 text-xs text-white/50">{acceptedFiles}</p>
              </>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptedFiles}
            onChange={handleFileChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadCard; 