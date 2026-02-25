'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [displayLocale, setDisplayLocale] = useState(locale);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 200; // Píxeles mínimos para activar el comportamiento

      // Si el scroll es muy pequeño, siempre mostrar la navbar
      if (currentScrollY < scrollThreshold) {
        setIsNavbarVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Detectar dirección del scroll
      if (currentScrollY > lastScrollY) {
        // Scroll hacia abajo - ocultar navbar
        setIsNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba - mostrar navbar
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    // Primero actualizar el estado visual para la animación
    setDisplayLocale(newLocale);
    // Luego cambiar el locale después de que la transición haya comenzado
    // Usar requestAnimationFrame para asegurar que el navegador procese el cambio visual primero
    requestAnimationFrame(() => {
      setTimeout(() => {
        router.push(pathname, { locale: newLocale });
      }, 200);
    });
  };

  // Sincronizar displayLocale con locale cuando cambia externamente
  useEffect(() => {
    setDisplayLocale(locale);
  }, [locale]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: '/community', label: t('community') },
    { href: '/landlords', label: t('landlords') },
    { href: '/blog', label: t('blog') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      style={{
        background: 'rgba(39, 39, 39, 0.2)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)', // Safari support
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-[85px]">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/assets/logos/logo.svg"
                alt="Kali Coliving"
                width={121}
                height={38}
                priority
              />
            </Link>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-8 ml-[130px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-red transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Language Switcher & CTA */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="relative h-[35px] w-[90px] rounded-full overflow-hidden"
              style={{
                background: 'rgba(39, 39, 39, 0.2)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
              }}
            >
              {/* Switch Background */}
              <div
                className="absolute top-1 left-1 w-[44px] h-[27px] rounded-full bg-white transition-transform duration-300 ease-in-out"
                style={{
                  transform: displayLocale === 'es' ? 'translateX(0px)' : 'translateX(38px)',
                  willChange: 'transform',
                }}
              />
              {/* Language Options */}
              <div className="relative h-full flex items-center">
                <button
                  onClick={() => {
                    if (locale !== 'es') toggleLocale();
                  }}
                  className={`flex-1 h-full flex items-center justify-center text-xs font-medium transition-colors duration-300 z-10 ${displayLocale === 'es' ? 'text-black font-semibold' : 'text-white'
                    }`}
                >
                  <span className="ml-2">ESP</span>
                  {/* ESP */}
                </button>
                <button
                  onClick={() => {
                    if (locale !== 'en') toggleLocale();
                  }}
                  className={`flex-1 h-full flex items-center justify-center text-xs font-medium transition-colors duration-300 z-10 ${displayLocale === 'en' ? 'text-black font-semibold' : 'text-white'
                    }`}
                >
                  <span className="mr-1">ENG</span>
                </button>
              </div>
            </div>
            <Link
              href="/apply"
              className=" py-3 w-[150px] text-center bg-red text-white rounded-lg hover:bg-red transition-colors font-semibold"
            >
              {t('applyNow')}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-between h-20">
          {/* Logo - Left */}
          <div className="flex-shrink-0 z-[9999]">
            <Link href="/" className="block z-[9999]">
              <Image
                src="/assets/logos/logo.svg"
                alt="Kali Coliving"
                width={121}
                height={38}
                priority
              />
            </Link>
          </div>

          {/* Burger Button - Right */}

          <div className="flex items-center gap-4">
            <div className=" flex justify-center z-[9999]">
              <div className="relative w-[95px] h-[35px]  rounded-full overflow-hidden"
                style={{
                  background: 'rgba(39, 39, 39, 0.2)',
                  backdropFilter: 'blur(22px)',
                  WebkitBackdropFilter: 'blur(22px)',
                }}
              >
                {/* Switch Background */}
                <div
                  className="absolute top-1 left-1 w-[45px] h-[27px] rounded-full bg-red transition-transform duration-300 ease-in-out"
                  style={{
                    transform: displayLocale === 'es' ? 'translateX(0px)' : 'translateX(40px)',
                    willChange: 'transform',
                  }}
                />
                {/* Language Options */}
                <div className="relative h-full flex items-center">
                  <button
                    onClick={() => {
                      if (locale !== 'es') toggleLocale();
                    }}
                    className={`flex-1 h-full flex items-center justify-center text-sm font-medium transition-colors duration-300 z-10 ${displayLocale === 'es' ? 'text-white font-semibold' : 'text-white'
                      }`}
                  >
                    <span className="ml-2">ESP</span>
                  </button>
                  <button
                    onClick={() => {
                      if (locale !== 'en') toggleLocale();
                    }}
                    className={`flex-1 h-full flex items-center justify-center text-sm font-medium transition-colors duration-300 z-10 ${displayLocale === 'en' ? 'text-white font-semibold' : 'text-white'
                      }`}
                  >
                    <span className="mr-[5px]">ENG</span>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="relative w-8 h-8 z-[9999] flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {/* Plus/Minus Icon */}
              <div className="relative w-[22px] h-[22px] flex items-center justify-center">
                {/* Horizontal line - always visible */}
                <span
                  className="absolute w-full h-[3px] bg-white transition-all duration-300 ease-in-out"
                />
                {/* Vertical line - disappears when open */}
                <span
                  className={`absolute w-[3px] h-full bg-white transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'opacity-100 scale-100'
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}

          onClick={toggleMobileMenu}
        />

        {/* Mobile Menu Content */}
        <div className={isMobileMenuOpen ? 'opacity-100 pointer-events-auto w-screen h-screen  ' : 'opacity-0 w-0 h-0 transition-opacity duration-300 ease-in-out'}>
          <div
            className={`lg:hidden fixed inset-0 z-50 flex flex-col h-[100dvh] min-h-[530px] transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            style={{
              background: 'rgba(60, 60, 60, 0.45)',
              backdropFilter: 'blur(157px)',
              WebkitBackdropFilter: 'blur(157px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 blabla flex flex-col justify-center px-6 py-8"

            >
              {/* Language Switcher - First */}



              {/* Navigation Links */}
              <nav className="space-y-4 mb-8">
                {/* Home - Only visible on mobile */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block title text-white hover:opacity-80 transition-opacity"
                >
                  {t('home')}
                </Link>

                {/* Other Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block title text-white hover:opacity-80 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

            </div>
            <div className="flex justify-center px-6">
              <Link
                href="/apply"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full mb-10 px-6 py-4 bg-red text-white rounded-lg hover:bg-red transition-colors font-semibold text-center text-lg"
              >
                {t('applyNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}
