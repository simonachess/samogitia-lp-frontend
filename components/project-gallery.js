"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProjectGallery({ images = [], projectTitle = "" }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => setModalOpen(false), []);

  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  };

  const goNext = () => {
    setCurrentIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const hasMultiple = images.length > 1;

  return (
    <div className="w-full max-w-[900px] flex flex-col gap-4 items-center">
      {/* Main image – larger, clickable to open modal */}
      <button
        type="button"
        onClick={() => openModal(0)}
        className="w-full relative aspect-[16/10] overflow-hidden rounded-xl bg-primary-100 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary-400/25 focus:ring-offset-2"
      >
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 900px) 100vw, 900px"
        />
      </button>

      {/* Thumbnails – only when more than one image */}
      {hasMultiple && (
        <div className="w-full flex flex-wrap justify-center gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => openModal(idx)}
              className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-transparent hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/25 focus:ring-offset-1 transition-colors"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Galerija: ${projectTitle}`}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-white bg-white/10 hover:bg-white/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Uždaryti"
          >
            <X className="w-6 h-6" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Ankstesnė nuotrauka"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Kita nuotrauka"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded"
            />
          </div>

          {hasMultiple && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
