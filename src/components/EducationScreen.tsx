import React, { useState } from 'react';
import { ChevronLeft, Scissors, Cpu, Heart, Leaf, BookOpen, Clock, Play, ImageIcon, Eye, ChevronRight, Video } from 'lucide-react';
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

interface EducationScreenProps {
  content: EducationContent[];
  onBack: () => void;
  onSelectContent: (content: EducationContent) => void;
}

export function EducationScreen({ content, onBack, onSelectContent }: EducationScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'procedures' | 'technology' | 'recovery' | 'wellness'>('procedures');
  const [contentTypeFilter, setContentTypeFilter] = useState<'all' | 'video' | 'gallery'>('all');

  const categories = [
    { key: 'procedures' as const, label: 'Procedimientos', color: '#4C9AFF', icon: Scissors },
    { key: 'technology' as const, label: 'Tecnología', color: '#8B5CF6', icon: Cpu },
    { key: 'recovery' as const, label: 'Recuperación', color: '#10B981', icon: Heart },
    { key: 'wellness' as const, label: 'Bienestar', color: '#F59E0B', icon: Leaf }
  ];

  const filteredContent = content.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesType = contentTypeFilter === 'all' || item.type === contentTypeFilter;
    return matchesCategory && matchesType;
  });

  const featuredContent = content.filter(item => item.type === 'video')[0];

  return (
    <div className="min-h-screen bg-[#F6F7FB] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-[#1A1A1A]">Biblioteca Educativa</h1>
            <p className="text-sm text-[#6B7280]">Videos, galerías y recursos sobre procedimientos</p>
          </div>
        </div>

        {/* Featured Video */}
        {featuredContent && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#1A1A1A]">Destacado</h3>
              <span className="text-xs text-[#6B7280] flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {featuredContent.views?.toLocaleString()} vistas
              </span>
            </div>
            <button
              onClick={() => onSelectContent(featuredContent)}
              className="w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src={featuredContent.thumbnail || ''}
                  alt={featuredContent.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 text-[#4C9AFF] ml-1" />
                  </div>
                </div>
                {featuredContent.duration && (
                  <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredContent.duration}
                  </div>
                )}
              </div>
              <div className="p-5 text-left">
                <h4 className="text-[#1A1A1A] mb-2">{featuredContent.title}</h4>
                <p className="text-sm text-[#6B7280] line-clamp-2">{featuredContent.description}</p>
              </div>
            </button>
          </div>
        )}

        {/* Content Type Filter */}
        <div className="mb-6">
          <h3 className="text-[#1A1A1A] mb-4">Tipo de Contenido</h3>
          <div className="flex gap-3">
            {[
              { key: 'all' as const, label: 'Todo', icon: BookOpen },
              { key: 'video' as const, label: 'Videos', icon: Video },
              { key: 'gallery' as const, label: 'Galerías', icon: ImageIcon }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setContentTypeFilter(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  contentTypeFilter === key
                    ? 'bg-[#4C9AFF] text-white shadow-lg shadow-[#4C9AFF]/30'
                    : 'bg-white text-[#6B7280] hover:bg-[#4C9AFF]/10 hover:text-[#4C9AFF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-[#1A1A1A] mb-4">Categorías</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map(({ key, label, color, icon: Icon }) => {
              const count = content.filter(a => {
                const matchesCategory = a.category === key;
                const matchesType = contentTypeFilter === 'all' || a.type === contentTypeFilter;
                return matchesCategory && matchesType;
              }).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`rounded-2xl p-4 border-2 transition-all ${
                    selectedCategory === key
                      ? 'border-[#4C9AFF] shadow-lg'
                      : 'border-transparent bg-white hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === key ? `${color}10` : undefined
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto transition-all"
                    style={{
                      backgroundColor: selectedCategory === key ? color : `${color}15`,
                      color: selectedCategory === key ? 'white' : color
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#1A1A1A] text-center">{label}</p>
                  <p className="text-xs text-[#6B7280] text-center mt-1">{count} {count === 1 ? 'recurso' : 'recursos'}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#1A1A1A]">
              {categories.find(c => c.key === selectedCategory)?.label}
            </h3>
            <span className="text-sm text-[#6B7280]">
              {filteredContent.length} {filteredContent.length === 1 ? 'resultado' : 'resultados'}
            </span>
          </div>
          
          {filteredContent.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <BookOpen className="w-12 h-12 text-[#4C9AFF] mx-auto mb-4" />
              <h3 className="text-[#1A1A1A] mb-2">No hay contenido disponible</h3>
              <p className="text-sm text-[#6B7280]">Pronto agregaremos más recursos educativos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredContent.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectContent(item)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group text-left"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#F6F7FB]">
                    <ImageWithFallback
                      src={item.thumbnail || ''}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Content Type Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        {item.type === 'video' ? (
                          <>
                            <Play className="w-3 h-3 text-[#4C9AFF]" />
                            <span className="text-xs text-[#1A1A1A]">Video</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3 h-3 text-[#8B5CF6]" />
                            <span className="text-xs text-[#1A1A1A]">
                              {item.images?.length || 0} fotos
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Duration for videos */}
                    {item.type === 'video' && item.duration && (
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded text-white text-xs">
                        {item.duration}
                      </div>
                    )}

                    {/* Play overlay for videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-[#4C9AFF] ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-[#1A1A1A] mb-1.5 line-clamp-2">{item.title}</h4>
                    <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.views?.toLocaleString() || 0}
                      </span>
                      <span className="flex items-center gap-1 text-[#4C9AFF]">
                        Ver más
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
