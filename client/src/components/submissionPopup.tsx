"use client";

import { X } from "lucide-react";
import { useRef } from "react";
import { Status } from "@/lib/types/type"

const SubmissionPopup = () => {
  const dialog = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (dialog.current && !dialog.current.contains(event.target as Node)) {
        dialog.current.style.display = "none";
    }
  };

  return (

    <div
      ref={dialog}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm"></div>
      <div className="w-150 h-50 bg-white p-4 rounded shadow-md">
        <div>
          <X />
        </div>
        <h2 className="text-lg font-semibold">Submission Successful!</h2>
      </div>
    </div>
  );
};

export default SubmissionPopup;
