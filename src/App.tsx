import React, { useState } from 'react';
import { Home, Calendar, MessageCircle, FileText, User, ChevronLeft, X, Plus, ArrowRight, Mail, Lock, Stethoscope, UserCircle, Phone, MapPin, CalendarDays, LogOut, Camera, CheckCircle, TrendingUp, Scissors, Cpu, Heart, Leaf, BookOpen, Clock, ChevronRight, Paperclip, Send, AlertTriangle, PhoneCall, Shield, Star } from 'lucide-react';
import { CustomButton } from './components/CustomButton';
import { CustomInput } from './components/CustomInput';
import { StatusBadge } from './components/StatusBadge';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type UserType = 'patient' | 'staff' | null;
type Screen = 'get-started' | 'signup' | 'staff-login' | 'user-select' | 'login' | 'dashboard' | 'appointments' | 'appointment-detail' | 'request-appointment' | 'chat' | 'medical-records' | 'profile' | 'photos' | 'photo-comparison' | 'education' | 'article-detail';
type Tab = 'home' | 'appointments' | 'chat' | 'records' | 'profile';

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  doctor: string;
  status: 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

interface MedicalRecord {
  id: string;
  title: string;
  date: string;
  description: string;
  type: string;
}

interface Photo {
  id: string;
  category: 'before' | 'during' | 'after' | 'progress';
  date: string;
  notes?: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'procedures' | 'technology' | 'recovery' | 'wellness';
  readTime: number;
  content: string;
  date: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'patient' | 'staff';
  timestamp: string;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('get-started');
  const [userType, setUserType] = useState<UserType>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [photoCategory, setPhotoCategory] = useState<'before' | 'during' | 'after' | 'progress'>('before');
  const [messageText, setMessageText] = useState('');
  
  // Mock data
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      type: 'Consulta General',
      date: '2025-11-25',
      time: '10:00',
      doctor: 'Dr. Nirmala Azalea',
      status: 'confirmed',
      notes: 'Revisión post-operatoria'
    },
    {
      id: '2',
      type: 'Seguimiento',
      date: '2025-12-02',
      time: '14:00',
      doctor: 'Dr. Martin B. Robles Mejía',
      status: 'scheduled',
    }
  ]);

  const [medicalRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      title: 'Consulta Inicial',
      date: '2025-10-15',
      description: 'Evaluación inicial para procedimiento',
      type: 'Consulta'
    },
    {
      id: '2',
      title: 'Pre-operatorio',
      date: '2025-10-20',
      description: 'Análisis de laboratorio y preparación',
      type: 'Examen'
    }
  ]);

  const [photos] = useState<Photo[]>([
    { id: '1', category: 'before', date: '2025-10-01', notes: 'Foto inicial' },
    { id: '2', category: 'before', date: '2025-10-02', notes: 'Vista lateral' },
    { id: '3', category: 'after', date: '2025-11-15', notes: 'Resultado después de 2 semanas' },
    { id: '4', category: 'progress', date: '2025-11-10', notes: 'Progreso intermedio' }
  ]);

  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Rinoplastia: Todo lo que necesitas saber',
      excerpt: 'Conoce los detalles del procedimiento más popular en cirugía estética facial.',
      category: 'procedures',
      readTime: 8,
      content: 'La rinoplastia es un procedimiento quirúrgico que modifica la forma de la nariz para mejorar su apariencia y/o función. Es uno de los procedimientos más comunes en cirugía plástica facial...',
      date: '2025-11-01'
    },
    {
      id: '2',
      title: 'Recuperación post-operatoria: Guía completa',
      excerpt: 'Tips esenciales para una recuperación exitosa después de tu cirugía.',
      category: 'recovery',
      readTime: 10,
      content: 'La recuperación post-operatoria es crucial para obtener los mejores resultados. Aquí encontrarás todo lo que necesitas saber...',
      date: '2025-11-05'
    },
    {
      id: '3',
      title: 'Tecnología láser en cirugía estética',
      excerpt: 'Descubre cómo la tecnología láser está revolucionando los procedimientos estéticos.',
      category: 'technology',
      readTime: 6,
      content: 'La tecnología láser ha transformado la cirugía estética moderna, ofreciendo resultados más precisos y tiempos de recuperación más cortos...',
      date: '2025-11-10'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, ¿en qué podemos ayudarte hoy?',
      sender: 'staff',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '2',
      text: 'Tengo una pregunta sobre mi cita del próximo martes',
      sender: 'patient',
      timestamp: new Date(Date.now() - 3000000).toISOString()
    },
    {
      id: '3',
      text: 'Por supuesto, ¿qué te gustaría saber?',
      sender: 'staff',
      timestamp: new Date(Date.now() - 2400000).toISOString()
    }
  ]);

  const patientData = {
    name: 'Zhafira Azalea',
    email: 'zhafira.azalea@email.com',
    phone: '+1 234 567 890',
    dateOfBirth: '1990-05-15',
    address: 'Calle Principal 123, Ciudad'
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setScreen('dashboard');
      setActiveTab('home');
    }, 1500);
  };

  const handleLogout = () => {
    setScreen('get-started');
    setUserType(null);
    setActiveTab('home');
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'patient',
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
    
    // Simulate staff response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. Un miembro de nuestro equipo te responderá pronto.',
        sender: 'staff',
        timestamp: new Date().toISOString()
      }]);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  // Get Started Screen (Welcome/Onboarding)
  if (screen === 'get-started') {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex flex-col">
        {/* Hero Image Section */}
        <div className="relative h-[45vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F6F7FB]"></div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1567745566980-4378a3db17fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwZG9jdG9yfGVufDF8fHx8MTc2MzQ1MTQ2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Nudah Clinic"
            className="w-full h-full object-cover"
          />
          
          {/* Floating Logo */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4C9AFF] to-[#3D8AEF] flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 px-6 -mt-8">
          <div className="max-w-md mx-auto">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-[#1A1A1A] mb-2">Nudah Clinic</h1>
              <p className="text-[#6B7280]">Cirugía plástica basada en la excelencia y la naturalidad</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-[#4C9AFF]" />
                </div>
                <h4 className="text-[#1A1A1A] text-sm mb-1">Gestión de Citas</h4>
                <p className="text-xs text-[#6B7280]">Agenda fácilmente</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-[#10B981]" />
                </div>
                <h4 className="text-[#1A1A1A] text-sm mb-1">Chat Directo</h4>
                <p className="text-xs text-[#6B7280]">Con tu doctor</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h4 className="text-[#1A1A1A] text-sm mb-1">Tu Progreso</h4>
                <p className="text-xs text-[#6B7280]">Seguimiento visual</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <h4 className="text-[#1A1A1A] text-sm mb-1">100% Seguro</h4>
                <p className="text-xs text-[#6B7280]">Datos protegidos</p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-r from-[#4C9AFF]/10 to-[#8B5CF6]/10 rounded-2xl p-4 mb-6 border border-[#4C9AFF]/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
              </div>
              <p className="text-center text-sm text-[#6B7280]">Calificación 5.0 • Más de 1,000 pacientes satisfechos</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-6 pb-8 space-y-4">
          <CustomButton
            variant="primary"
            className="w-full shadow-lg shadow-[#4C9AFF]/30"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => setScreen('signup')}
          >
            Comenzar como Paciente
          </CustomButton>

          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">¿Ya tienes cuenta?</p>
            <button
              onClick={() => {
                setUserType('patient');
                setScreen('login');
              }}
              className="text-[#4C9AFF] hover:text-[#3D8AEF] transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="pt-4 border-t border-[rgba(0,0,0,0.08)]">
            <button
              onClick={() => setScreen('staff-login')}
              className="w-full flex items-center justify-center gap-2 text-[#6B7280] hover:text-[#4C9AFF] transition-colors py-3"
            >
              <Stethoscope className="w-4 h-4" />
              <span className="text-sm">Acceso Staff Médico</span>
            </button>
          </div>

          <p className="text-xs text-center text-[#6B7280]">
            © 2025 Nudah Clinic. Todos los derechos reservados.
          </p>
        </div>
      </div>
    );
  }

  // Sign Up Screen (Patient Registration)
  if (screen === 'signup') {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex flex-col p-6">
        <button
          onClick={() => setScreen('get-started')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mx-auto">
              <UserCircle className="w-8 h-8 text-[#4C9AFF]" />
            </div>
            <h2 className="text-[#1A1A1A]">Crear Cuenta de Paciente</h2>
            <p className="text-sm text-[#6B7280]">Completa tus datos para comenzar</p>
          </div>

          {/* Sign Up Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 mb-6">
            <CustomInput
              label="Nombre Completo"
              type="text"
              placeholder="Tu nombre completo"
              icon={<UserCircle className="w-5 h-5" />}
            />

            <CustomInput
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              icon={<Mail className="w-5 h-5" />}
            />

            <CustomInput
              label="Teléfono"
              type="tel"
              placeholder="+1 234 567 890"
              icon={<Phone className="w-5 h-5" />}
            />

            <CustomInput
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
              icon={<Lock className="w-5 h-5" />}
              secure
            />

            <CustomInput
              label="Confirmar Contraseña"
              placeholder="Repite tu contraseña"
              icon={<Lock className="w-5 h-5" />}
              secure
            />

            <CustomButton
              variant="primary"
              className="w-full"
              onClick={() => {
                setUserType('patient');
                handleLogin();
              }}
              isLoading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Crear Cuenta
            </CustomButton>

            <div className="text-center">
              <p className="text-sm text-[#6B7280]">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={() => {
                    setUserType('patient');
                    setScreen('login');
                  }}
                  className="text-[#4C9AFF] hover:text-[#3D8AEF]"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-[#6B7280]">
            Al crear una cuenta, aceptas nuestros{' '}
            <button className="text-[#4C9AFF] hover:underline">Términos de Servicio</button>
            {' '}y{' '}
            <button className="text-[#4C9AFF] hover:underline">Política de Privacidad</button>
          </p>
        </div>
      </div>
    );
  }

  // Staff Login Screen
  if (screen === 'staff-login') {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex flex-col p-6">
        <button
          onClick={() => setScreen('get-started')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mx-auto">
              <Stethoscope className="w-8 h-8 text-[#4C9AFF]" />
            </div>
            <h2 className="text-[#1A1A1A]">Acceso Personal Médico</h2>
            <p className="text-sm text-[#6B7280]">Ingresa tus credenciales administrativas</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 mb-6">
            <CustomInput
              label="Correo Electrónico"
              type="email"
              placeholder="staff@nudahclinic.com"
              icon={<Mail className="w-5 h-5" />}
            />

            <CustomInput
              label="Contraseña"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              secure
            />

            <CustomButton
              variant="primary"
              className="w-full"
              onClick={() => {
                setUserType('staff');
                handleLogin();
              }}
              isLoading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </CustomButton>

            <CustomButton variant="ghost" className="w-full">
              ¿Olvidaste tu contraseña?
            </CustomButton>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)]">
            <h4 className="text-[#1A1A1A] mb-2">Acceso Restringido</h4>
            <p className="text-sm text-[#6B7280]">
              Esta área es solo para personal médico autorizado. Contacta al administrador si necesitas acceso.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User Type Selection Screen
  if (screen === 'user-select') {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-10 h-10 text-[#4C9AFF]" />
            </div>
            <h1 className="text-[#1A1A1A]">Dr. Martin B. Robles Mejía</h1>
            <p className="text-sm text-[#6B7280]">Nudah Clinic</p>
            <p className="text-xs text-[#6B7280]">Cirugía plástica basada en la excelencia y la naturalidad</p>
          </div>

          {/* Selection Cards */}
          <div className="space-y-4">
            <button
              onClick={() => {
                setUserType('patient');
                setScreen('login');
              }}
              className={`w-full p-6 bg-white rounded-2xl border-2 transition-all hover:border-[#4C9AFF] hover:shadow-lg ${
                userType === 'patient' ? 'border-[#4C9AFF] shadow-lg' : 'border-transparent'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-[#4C9AFF]" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-[#1A1A1A] mb-1">Paciente</h3>
                  <p className="text-sm text-[#6B7280]">Accede a tu información médica, citas y seguimiento</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setUserType('staff');
                setScreen('login');
              }}
              className={`w-full p-6 bg-white rounded-2xl border-2 transition-all hover:border-[#4C9AFF] hover:shadow-lg ${
                userType === 'staff' ? 'border-[#4C9AFF] shadow-lg' : 'border-transparent'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-6 h-6 text-[#4C9AFF]" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-[#1A1A1A] mb-1">Personal Médico</h3>
                  <p className="text-sm text-[#6B7280]">Acceso administrativo y gestión de pacientes</p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-[#6B7280]">© 2025 Nudah Clinic. Todos los derechos reservados.</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (screen === 'login') {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex flex-col p-6">
        <button
          onClick={() => setScreen('user-select')}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#1A1A1A] mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver a selección</span>
        </button>

        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mx-auto">
              {userType === 'patient' ? (
                <UserCircle className="w-8 h-8 text-[#4C9AFF]" />
              ) : (
                <Stethoscope className="w-8 h-8 text-[#4C9AFF]" />
              )}
            </div>
            <h2 className="text-[#1A1A1A]">
              {userType === 'patient' ? 'Acceso Paciente' : 'Acceso Personal Médico'}
            </h2>
            <p className="text-sm text-[#6B7280]">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 mb-6">
            <CustomInput
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              icon={<Mail className="w-5 h-5" />}
            />

            <CustomInput
              label="Contraseña"
              placeholder="••••••••"
              icon={<Lock className="w-5 h-5" />}
              secure
            />

            <CustomButton
              variant="primary"
              className="w-full"
              onClick={handleLogin}
              isLoading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </CustomButton>

            <CustomButton variant="ghost" className="w-full">
              ¿Olvidaste tu contraseña?
            </CustomButton>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)]">
            <h4 className="text-[#1A1A1A] mb-2">¿Necesitas ayuda?</h4>
            <p className="text-sm text-[#6B7280]">
              Contacta con el administrador para obtener tus credenciales de acceso
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard Layout
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div>
              <h1 className="text-[#1A1A1A] mb-1">Bienvenida, {patientData.name}</h1>
              <p className="text-sm text-[#6B7280]">Tu centro de cirugía plástica premium</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-[#4C9AFF]" />
                </div>
                <h2 className="text-[#1A1A1A] mb-1">{appointments.length}</h2>
                <p className="text-sm text-[#6B7280]">Total Citas</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h2 className="text-[#1A1A1A] mb-1">{medicalRecords.length}</h2>
                <p className="text-sm text-[#6B7280]">Registros Recientes</p>
              </div>
            </div>

            {/* Upcoming Appointments */}
            {appointments.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#1A1A1A]">Próximas Citas</h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-sm text-[#4C9AFF] hover:text-[#3D8AEF]"
                  >
                    Ver todas
                  </button>
                </div>
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => {
                        setSelectedAppointment(apt);
                        setScreen('appointment-detail');
                      }}
                      className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-left"
                    >
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-[#4C9AFF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#1A1A1A] mb-1">{apt.type}</h4>
                          <p className="text-sm text-[#6B7280]">{formatDate(apt.date)} • {apt.time}</p>
                          {apt.notes && (
                            <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{apt.notes}</p>
                          )}
                        </div>
                        <StatusBadge status={apt.status} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Access Grid */}
            <div>
              <h3 className="text-[#1A1A1A] mb-4">Acceso Rápido</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] hover:border-[#4C9AFF] transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mb-4">
                    <Calendar className="w-7 h-7 text-[#4C9AFF]" />
                  </div>
                  <h4 className="text-[#1A1A1A] mb-1">Mis Citas</h4>
                  <p className="text-xs text-[#6B7280]">Gestionar citas</p>
                </button>

                <button
                  onClick={() => setActiveTab('records')}
                  className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] hover:border-[#4C9AFF] transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mb-4">
                    <Camera className="w-7 h-7 text-[#8B5CF6]" />
                  </div>
                  <h4 className="text-[#1A1A1A] mb-1">Mis Fotos</h4>
                  <p className="text-xs text-[#6B7280]">Progreso visual</p>
                </button>

                <button
                  onClick={() => setActiveTab('chat')}
                  className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] hover:border-[#4C9AFF] transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
                    <MessageCircle className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <h4 className="text-[#1A1A1A] mb-1">Mensajes</h4>
                  <p className="text-xs text-[#6B7280]">Chat con doctor</p>
                </button>

                <button
                  onClick={() => {
                    setScreen('education');
                  }}
                  className="bg-white rounded-2xl p-6 border border-[rgba(0,0,0,0.08)] hover:border-[#4C9AFF] transition-all text-left"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F59E0B]/10 flex items-center justify-center mb-4">
                    <BookOpen className="w-7 h-7 text-[#F59E0B]" />
                  </div>
                  <h4 className="text-[#1A1A1A] mb-1">Educación</h4>
                  <p className="text-xs text-[#6B7280]">Recursos médicos</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <h1 className="text-[#1A1A1A]">Mis Citas</h1>

            <CustomButton
              variant="secondary"
              className="w-full"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => setScreen('request-appointment')}
            >
              Agendar Nueva Cita
            </CustomButton>

            {appointments.length === 0 ? (
              <div className="text-center py-16">
                <Calendar className="w-12 h-12 text-[#4C9AFF] mx-auto mb-4" />
                <h3 className="text-[#1A1A1A] mb-2">No tienes citas programadas</h3>
                <p className="text-sm text-[#6B7280]">Agenda tu primera cita para comenzar tu transformación</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => {
                      setSelectedAppointment(apt);
                      setScreen('appointment-detail');
                    }}
                    className="w-full bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-left"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-[#4C9AFF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#1A1A1A] mb-1">{apt.type}</h4>
                        <p className="text-sm text-[#6B7280]">{formatDate(apt.date)} • {apt.time}</p>
                        {apt.notes && (
                          <p className="text-sm text-[#6B7280] mt-1">{apt.notes}</p>
                        )}
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );

      case 'chat':
        return (
          <div className="flex flex-col h-[calc(100vh-180px)]">
            {/* Chat Header */}
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-[#4C9AFF]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#1A1A1A]">Staff Médico</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    <span className="text-xs text-[#6B7280]">Disponible</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F59E0B]/10 rounded-lg p-3 border border-[#F59E0B]/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#F59E0B] mb-1">IMPORTANTE - NO USAR PARA EMERGENCIAS</p>
                    <p className="text-xs text-[#6B7280]">Este chat es solo para consultas generales. En caso de emergencia médica, llama al 911 inmediatamente.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.sender === 'patient' ? '' : 'flex gap-2'}`}>
                    {msg.sender === 'staff' && (
                      <div className="w-7 h-7 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-4 h-4 text-[#4C9AFF]" />
                      </div>
                    )}
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          msg.sender === 'patient'
                            ? 'bg-[#4C9AFF] text-white rounded-tr-sm'
                            : 'bg-white border border-[rgba(0,0,0,0.08)] text-[#1A1A1A] rounded-tl-sm'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <p className={`text-xs text-[#6B7280] mt-1 ${msg.sender === 'patient' ? 'text-right' : msg.sender === 'staff' ? 'ml-0' : ''}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-end gap-2">
                <button className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center flex-shrink-0">
                  <Paperclip className="w-5 h-5 text-[#6B7280]" />
                </button>
                <div className="flex-1 bg-[#F0F2F5] rounded-2xl px-4 py-3">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="w-full bg-transparent outline-none text-[#1A1A1A] placeholder:text-[#6B7280]"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="w-10 h-10 rounded-full bg-[#4C9AFF] flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3D8AEF] transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'records':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-[#1A1A1A] mb-1">Mis Fotos</h1>
              <p className="text-sm text-[#6B7280]">Seguimiento de tu progreso</p>
            </div>

            {/* Category Selector */}
            <div>
              <h3 className="text-[#1A1A1A] mb-4">Categorías</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {[
                  { key: 'before' as const, label: 'Antes', color: '#4C9AFF', icon: Camera },
                  { key: 'during' as const, label: 'Durante', color: '#F59E0B', icon: Camera },
                  { key: 'after' as const, label: 'Después', color: '#10B981', icon: CheckCircle },
                  { key: 'progress' as const, label: 'Progreso', color: '#8B5CF6', icon: TrendingUp }
                ].map(({ key, label, color, icon: Icon }) => {
                  const count = photos.filter(p => p.category === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setPhotoCategory(key)}
                      className={`flex-shrink-0 rounded-2xl p-4 border-2 transition-all ${
                        photoCategory === key
                          ? 'border-[#4C9AFF] shadow-lg'
                          : 'border-transparent bg-white'
                      }`}
                      style={{
                        backgroundColor: photoCategory === key ? `${color}15` : undefined
                      }}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto`}
                        style={{
                          backgroundColor: photoCategory === key ? color : `${color}15`,
                          color: photoCategory === key ? 'white' : color
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className="text-sm text-[#1A1A1A] text-center">{label}</p>
                      <p className="text-xs text-[#6B7280] text-center">{count}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <CustomButton
              variant="secondary"
              className="w-full"
              icon={<Plus className="w-5 h-5" />}
            >
              Agregar Foto
            </CustomButton>

            {/* Photos Grid */}
            <div>
              {photos.filter(p => p.category === photoCategory).length === 0 ? (
                <div className="text-center py-16">
                  <Camera className="w-12 h-12 text-[#4C9AFF] mx-auto mb-4" />
                  <h3 className="text-[#1A1A1A] mb-2">No hay fotos en esta categoría</h3>
                  <p className="text-sm text-[#6B7280]">Agrega tu primera foto para comenzar a documentar tu progreso</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {photos.filter(p => p.category === photoCategory).map((photo) => (
                    <div key={photo.id} className="bg-white rounded-xl p-3 border border-[rgba(0,0,0,0.08)]">
                      <div className="aspect-square bg-[#4C9AFF]/10 rounded-lg mb-3 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-[#4C9AFF]" />
                      </div>
                      <p className="text-sm text-[#1A1A1A] mb-1">{photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}</p>
                      <p className="text-xs text-[#6B7280]">{formatDate(photo.date)}</p>
                      {photo.notes && (
                        <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">{photo.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-[#1A1A1A]">Perfil</h1>

            {/* Profile Header */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center mx-auto mb-4">
                <UserCircle className="w-12 h-12 text-[#4C9AFF]" />
              </div>
              <h2 className="text-[#1A1A1A] mb-1">{patientData.name}</h2>
              <p className="text-sm text-[#6B7280]">Paciente</p>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#1A1A1A] mb-4">Información Personal</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#4C9AFF] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280]">Email</p>
                    <p className="text-[#1A1A1A]">{patientData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#4C9AFF] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280]">Teléfono</p>
                    <p className="text-[#1A1A1A]">{patientData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays className="w-5 h-5 text-[#4C9AFF] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280]">Fecha de Nacimiento</p>
                    <p className="text-[#1A1A1A]">{formatDate(patientData.dateOfBirth)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#4C9AFF] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[#6B7280]">Dirección</p>
                    <p className="text-[#1A1A1A]">{patientData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="space-y-4">
              <CustomButton
                variant="outline"
                className="w-full"
                icon={<LogOut className="w-5 h-5" />}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </CustomButton>
              <p className="text-xs text-center text-[#6B7280]">Versión 1.0.0</p>
            </div>
          </div>
        );
    }
  };

  // Appointment Detail Screen
  if (screen === 'appointment-detail' && selectedAppointment) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setScreen('dashboard')}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-[#1A1A1A]">Detalle de Cita</h2>
            <button
              onClick={() => setScreen('dashboard')}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              Cerrar
            </button>
          </div>

          <div className="space-y-4">
            {/* Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-[#1A1A1A] mb-1">{selectedAppointment.type}</h2>
                  <p className="text-sm text-[#6B7280]">{selectedAppointment.doctor}</p>
                </div>
                <StatusBadge status={selectedAppointment.status} />
              </div>

              <div className="border-t border-[rgba(0,0,0,0.08)] pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#4C9AFF]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Fecha</p>
                    <p className="text-[#1A1A1A]">{formatDate(selectedAppointment.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#4C9AFF]" />
                  <div>
                    <p className="text-xs text-[#6B7280]">Hora</p>
                    <p className="text-[#1A1A1A]">{selectedAppointment.time}</p>
                  </div>
                </div>

                {selectedAppointment.notes && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#4C9AFF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#6B7280]">Notas</p>
                      <p className="text-[#1A1A1A]">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#1A1A1A] mb-4">Acciones</h3>
              <div className="space-y-3">
                <CustomButton variant="secondary" className="w-full" icon={<Calendar className="w-5 h-5" />}>
                  Reagendar Cita
                </CustomButton>
                <CustomButton
                  variant="outline"
                  className="w-full !text-[#EF4444] !border-[#EF4444] hover:!bg-[#EF4444]/10"
                  icon={<X className="w-5 h-5" />}
                >
                  Cancelar Cita
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Request Appointment Screen
  if (screen === 'request-appointment') {
    return (
      <div className="min-h-screen bg-[#F6F7FB] p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setScreen('dashboard')}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              Cancelar
            </button>
            <h2 className="text-[#1A1A1A]">Solicitar Cita</h2>
            <div className="w-16"></div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <label className="block text-sm text-[#1A1A1A] mb-2">Fecha</label>
              <input
                type="date"
                className="w-full h-12 px-4 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF]/20"
              />
            </div>

            <div>
              <label className="block text-sm text-[#1A1A1A] mb-2">Hora</label>
              <select className="w-full h-12 px-4 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF]/20">
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#1A1A1A] mb-2">Razón</label>
              <select className="w-full h-12 px-4 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF]/20">
                <option>Evaluación</option>
                <option>Pre-operatorio</option>
                <option>Post-operatorio</option>
                <option>Consulta General</option>
                <option>Seguimiento</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#1A1A1A] mb-2">Notas Adicionales (opcional)</label>
              <textarea
                rows={3}
                placeholder="Notas adicionales..."
                className="w-full px-4 py-3 rounded-xl border border-[rgba(0,0,0,0.08)] focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF]/20 resize-none"
              />
            </div>

            <CustomButton
              variant="primary"
              className="w-full"
              icon={<Calendar className="w-5 h-5" />}
              onClick={() => {
                setScreen('dashboard');
                setActiveTab('appointments');
              }}
            >
              Solicitar Cita
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  // Education Screen
  if (screen === 'education') {
    const [selectedCategory, setSelectedCategory] = useState<'procedures' | 'technology' | 'recovery' | 'wellness'>('procedures');

    return (
      <div className="min-h-screen bg-[#F6F7FB] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setScreen('dashboard')}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-[#1A1A1A]">Educación Médica</h1>
              <p className="text-sm text-[#6B7280]">Recursos y información sobre procedimientos</p>
            </div>
          </div>

          {/* Featured Article */}
          {articles[0] && (
            <div className="mb-6">
              <h3 className="text-[#1A1A1A] mb-4">Artículo Destacado</h3>
              <button
                onClick={() => {
                  setSelectedArticle(articles[0]);
                  setScreen('article-detail');
                }}
                className="w-full bg-gradient-to-br from-[#4C9AFF]/10 to-[#4C9AFF]/5 rounded-2xl p-6 border border-[#4C9AFF]/30 hover:shadow-lg transition-all text-left"
              >
                <h4 className="text-[#1A1A1A] mb-2 line-clamp-2">{articles[0].title}</h4>
                <p className="text-sm text-[#6B7280] mb-3 line-clamp-3">{articles[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {articles[0].readTime} min
                  </span>
                  <span className="text-[#4C9AFF]">{articles[0].category}</span>
                </div>
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-[#1A1A1A] mb-4">Categorías</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                { key: 'procedures' as const, label: 'Procedimientos', color: '#4C9AFF', icon: Scissors },
                { key: 'technology' as const, label: 'Tecnología', color: '#8B5CF6', icon: Cpu },
                { key: 'recovery' as const, label: 'Recuperación', color: '#10B981', icon: Heart },
                { key: 'wellness' as const, label: 'Bienestar', color: '#F59E0B', icon: Leaf }
              ].map(({ key, label, color, icon: Icon }) => {
                const count = articles.filter(a => a.category === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`flex-shrink-0 rounded-2xl p-4 border-2 transition-all ${
                      selectedCategory === key
                        ? 'border-[#4C9AFF] shadow-lg'
                        : 'border-transparent bg-white'
                    }`}
                    style={{
                      backgroundColor: selectedCategory === key ? `${color}15` : undefined
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 mx-auto`}
                      style={{
                        backgroundColor: selectedCategory === key ? color : `${color}15`,
                        color: selectedCategory === key ? 'white' : color
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-[#1A1A1A] text-center whitespace-nowrap">{label}</p>
                    <p className="text-xs text-[#6B7280] text-center">{count}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles List */}
          <div className="space-y-4">
            {articles.filter(a => a.category === selectedCategory).length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-[#4C9AFF] mx-auto mb-4" />
                <h3 className="text-[#1A1A1A] mb-2">No hay artículos en esta categoría</h3>
                <p className="text-sm text-[#6B7280]">Pronto agregaremos más contenido educativo</p>
              </div>
            ) : (
              articles.filter(a => a.category === selectedCategory).map((article) => (
                <button
                  key={article.id}
                  onClick={() => {
                    setSelectedArticle(article);
                    setScreen('article-detail');
                  }}
                  className="w-full bg-white rounded-xl p-4 border border-[rgba(0,0,0,0.08)] hover:shadow-lg transition-all text-left"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#4C9AFF]/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-[#4C9AFF]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#1A1A1A] mb-1 line-clamp-2">{article.title}</h4>
                      <p className="text-sm text-[#6B7280] mb-2 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime} min
                        </span>
                        <span className="text-[#4C9AFF]">{article.category}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#6B7280] flex-shrink-0" />
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Article Detail Screen
  if (screen === 'article-detail' && selectedArticle) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setScreen('education')}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setScreen('education')}
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              Cerrar
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-[#1A1A1A] text-center mb-4">{selectedArticle.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-[#6B7280] mb-6 pb-6 border-b border-[rgba(0,0,0,0.08)]">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedArticle.readTime} min
              </span>
              <span className="text-[#4C9AFF]">{selectedArticle.category}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(selectedArticle.date)}
              </span>
            </div>
            <div className="prose max-w-none">
              <p className="text-[#1A1A1A] leading-relaxed">{selectedArticle.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard with Tab Navigation
  return (
    <div className="min-h-screen bg-[#F6F7FB] pb-24">
      {/* Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(0,0,0,0.08)] px-6 py-3 safe-area-inset-bottom">
        <div className="max-w-4xl mx-auto flex justify-around items-center">
          {[
            { key: 'home' as const, icon: Home, label: 'Inicio' },
            { key: 'appointments' as const, icon: Calendar, label: 'Citas' },
            { key: 'chat' as const, icon: MessageCircle, label: 'Chat' },
            { key: 'records' as const, icon: Camera, label: 'Fotos' },
            { key: 'profile' as const, icon: User, label: 'Perfil' }
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setScreen('dashboard');
              }}
              className={`flex flex-col items-center gap-1 py-2 transition-colors ${
                activeTab === key ? 'text-[#4C9AFF]' : 'text-[#6B7280]'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
