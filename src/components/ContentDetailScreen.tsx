import React, { useState } from 'react';
import { ChevronLeft, X, Eye, Calendar, Play, ChevronRight, ChevronLeft as ChevronLeftIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EducationContent {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'gallery';
  category: 'procedures' | 'technology' | 'recovery' | 'wellness';
  thumbnail?: string;
  videoUrl?: string;
  duration?: string;
  images?: string[];
  date: string;
  views?: number;
}

interface ContentDetailScreenProps {
  content: EducationContent;
  onBack: () => void;
}

export function ContentDetailScreen({ content, onBack }: ContentDetailScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const nextImage = () => {
    if (content.images) {
      setCurrentImageIndex((prev) => (prev + 1) % content.images!.length);
    }
  };

  const prevImage = () => {
    if (content.images) {
      setCurrentImageIndex((prev) => (prev - 1 + content.images!.length) % content.images!.length);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'procedures': return '#4C9AFF';
      case 'technology': return '#8B5CF6';
      case 'recovery': return '#10B981';
      case 'wellness': return '#F59E0B';
      default: return '#4C9AFF';
    }
  };

  const categoryColor = getCategoryColor(content.category);

  return (
    <div className="min-h-screen bg-[#F6F7FB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Volver</span>
          </button>
          <button
            onClick={onBack}
            className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Media Section */}
          {content.type === 'video' && content.videoUrl ? (
            <div className="relative aspect-video bg-black">
              <iframe
                src={content.videoUrl}
                title={content.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : content.type === 'gallery' && content.images && content.images.length > 0 ? (
            <div className="relative aspect-video bg-[#F6F7FB]">
              <ImageWithFallback
                src={content.images[currentImageIndex]}
                alt={`${content.title} - Imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
              
              {/* Navigation Arrows */}
              {content.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-[#1A1A1A]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 text-[#1A1A1A]" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {content.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {content.images.length}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-[#4C9AFF]/10 to-[#8B5CF6]/10 flex items-center justify-center">
              <Play className="w-20 h-20 text-[#4C9AFF]/40" />
            </div>
          )}

          {/* Content Info */}
          <div className="p-6 sm:p-8">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {content.category === 'procedures' && 'Procedimientos'}
                {content.category === 'technology' && 'Tecnología'}
                {content.category === 'recovery' && 'Recuperación'}
                {content.category === 'wellness' && 'Bienestar'}
              </span>
              <span className="text-xs text-[#6B7280] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {content.views?.toLocaleString() || 0} vistas
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[#1A1A1A] mb-4">{content.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-6 pb-6 border-b border-[rgba(0,0,0,0.08)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(content.date)}
              </span>
              {content.type === 'video' && content.duration && (
                <span className="flex items-center gap-1.5">
                  <Play className="w-4 h-4" />
                  {content.duration}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-[#6B7280] leading-relaxed">{content.description}</p>
              
              {content.type === 'video' && (
                <div className="mt-6 p-4 bg-[#4C9AFF]/5 rounded-xl border border-[#4C9AFF]/20">
                  <h3 className="text-[#1A1A1A] mb-2">Sobre este video</h3>
                  <p className="text-sm text-[#6B7280]">
                    Este video educativo ha sido preparado por el Dr. Martin B. Robles Mejía para brindar información
                    detallada sobre el procedimiento. Si tienes preguntas adicionales, no dudes en contactarnos.
                  </p>
                </div>
              )}

              {content.type === 'gallery' && content.images && (
                <div className="mt-6">
                  <h3 className="text-[#1A1A1A] mb-4">Galería Completa</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {content.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setIsImageModalOpen(true);
                        }}
                        className={`relative aspect-square rounded-xl overflow-hidden ${
                          index === currentImageIndex ? 'ring-2 ring-[#4C9AFF]' : ''
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${content.title} - Imagen ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="mt-8 pt-6 border-t border-[rgba(0,0,0,0.08)]">
              <div className="bg-gradient-to-r from-[#4C9AFF]/10 to-[#8B5CF6]/10 rounded-2xl p-6 border border-[#4C9AFF]/20">
                <h3 className="text-[#1A1A1A] mb-2">¿Tienes preguntas?</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Agenda una consulta para discutir tus objetivos y opciones personalizadas.
                </p>
                <button className="w-full sm:w-auto px-6 py-3 bg-[#4C9AFF] text-white rounded-xl hover:bg-[#3D8AEF] transition-colors shadow-lg shadow-[#4C9AFF]/30">
                  Agendar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {isImageModalOpen && content.type === 'gallery' && content.images && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={content.images[currentImageIndex]}
              alt={`${content.title} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {content.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                  {currentImageIndex + 1} / {content.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
