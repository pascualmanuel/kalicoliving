import { useTranslations } from 'next-intl';
import Image from 'next/image';
import dividerNotFilledSvg from '../../../public/assets/icons/divider-not-filled-2.svg';
import dividerSvg from '../../../public/assets/icons/divider-not-filled.svg';
import LandlordsCarousel from '../../../components/LandlordsCarousel';
import landlordsMobileImage from '../../../public/assets/images/landlords/hero-image-mob.jpg';
// import landlordsSubheroImage from '../../../public/assets/images/landlords/subhero-image.png';
import landlordsHeroImage from '../../../public/assets/images/landlords/hero-image.webp';
import groupImage from '../../../public/assets/images/landlords/group.png';
import groupImage2 from '../../../public/assets/images/landlords/group-2.png';
import brownDividerSvg from '../../../public/assets/icons/brown-divider.svg';
import PinkDividerSvg from '../../../public/assets/icons/pink-divider.svg';
import LandlordsReviews from '../../../components/LandlordsReviews';
import LandlordsForm from '../../../components/LandlordsForm.tsx';
import Footer from '../../../components/Footer';
export default function LandlordsPage() {
  const t = useTranslations('pages.landlords');

  return (
    <>
      <main>
        <div className="relative h-[740px]  sm:h-screen min-h-[670px] bg-red md:min-h-[780px] overflow-hidden flex flex-col items-center justify-center">


          <Image
            src={landlordsHeroImage}
            alt="Home background"
            fill
            priority
            className="object-cover object-top brightness-[0.7] z-0"
          />
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 ">
            <h1 className='text-white max-w-[850px] title text-center text-[50px] md:text-[80px]'>
              {t('heroTitle')}
            </h1>
            <h2 className='text-white max-w-[510px] text-center text-[20px] md:text-[32px] leading-[100%]'>
              {t('heroSubtitle')}
            </h2>
          </div>
          <Image
            src={dividerNotFilledSvg}
            alt="divider"
            width={1512}
            height={193}
            className="absolute bottom-0 left-1/2 w-[130vw] max-w-none -translate-x-1/2 pointer-events-none rotate-180"
          />
        </div>

        <div className='mt-10 mb-[80px]'>
          <div className='flex sm:flex-row flex-col justify-between max-w-[985px] mx-auto px-10 gap-10 sm:gap-0 ' >
            <div className="flex flex-col text-center"> <h3 className='text-red text-[60px] font-semibold'>  100%</h3> <p className='text-[20px] font-semibold'>
              {t('onTimePayments')}
            </p>
            </div>
            <div className="flex flex-col text-center">  <h3 className='text-red text-[60px] font-semibold' >100%</h3> <p className='text-[20px] font-semibold'>
              {t('occupancyRate')}
            </p> </div>
            <div className="flex flex-col text-center">  <h3 className='text-red text-[60px] font-semibold' >24/7</h3> <p className='text-[20px] font-semibold'>
              {t('availableSupport')}
            </p> </div>
          </div>
        </div>


        <div className='w-full sm:h-auto h-[670px] sm:px-[60px] px-5 '>
          <div className='w-full h-full sm:h-[900px] relative mx-auto bg-pink rounded-[16px] overflow-hidden'>

            {/* Imagen de fondo */}
            <Image
              src={groupImage2}
              alt="group"
              width={1392}
              height={657}
              className='w-full  object-cover rounded-[16px]  h-[50%] sm:h-[70%]'
            />

            {/* Overlay con divider + texto */}
            <div className='absolute bottom-0 left-0 w-full '>

              {/* ✅ SVG inline — preserveAspectRatio="none" es clave */}
              <div
                className="w-[calc(100%+104px)] translate-x-[-52px] mb-[-90px]  sm:block hidden "
                style={{ background: 'linear-gradient(to bottom, transparent 50%, #eb9a89 50%)' }}>
                <svg
                  viewBox="0 0 1888 445"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  className="w-full block"
                  style={{ height: "193px" }}
                >


                  <path

                    d="M933.48.03c58.12.76,133.47,14.2,208.96,31.08,77.84,17.4,164.71,40.56,249.29,64.47,175.14,49.5,329.8,98.82,407.93,118.97,63.06,16.27,100.9,80.2,84.51,142.78-16.4,62.59-80.82,100.13-143.88,83.87-78.74-20.32-253.41-75.23-413.21-120.39-82.87-23.42-164.93-45.22-236.52-61.23-73.94-16.53-128.61-24.97-160.2-25.39-29.24-.38-89.94,8.8-175.41,27.86-81.68,18.21-175.48,42.95-265.01,68.15-89.31,25.14-173.25,50.39-234.94,69.39-30.81,9.49-56.01,17.42-73.47,22.94-8.72,2.76-15.52,4.91-20.12,6.38-2.3.73-4.07,1.31-5.25,1.69-.57.18-1.08.33-1.41.43-.15.05-.35.13-.53.18,0,0-.29.09-.53.16-.16.05-.61.18-.9.28-1.03.29-22.43,4.54-43.4,4.87-30.91-2.26-72.08-18.58-95.25-61.2C-3.75,342.4-.13,312,1.27,302.59c1.83-12.31,5.25-21.57,6.91-25.78,1.02-2.57,2.01-4.78,2.83-6.54.42-.89.82-1.74,1.2-2.49l.81-1.6.14-.25.14-.25c15.97-30.53,43.58-51.19,74.65-59.33.36-.11.74-.22,1.13-.34,4.79-1.53,11.82-3.77,20.79-6.61,17.95-5.68,43.74-13.78,75.2-23.47,62.88-19.36,148.78-45.2,240.49-71.01,91.49-25.75,189.95-51.8,277.66-71.36C787.13,14.85,873.01-.76,933.48.03Z"
                    fill="#eb9a89"
                    fillRule="evenodd"
                  />
                </svg>
              </div>



              {/* Fondo sólido que continúa debajo del SVG */}
              <div className="bg-[#eb9a89] w-full flex flex-col items-center gap-6 pb-10 pt-4 rounded-b-[16px]">
                <Image src={PinkDividerSvg} alt="divider" width={1512} height={193} className="   mx-auto absolute top-[-20%] left-0  block sm:hidden" />
                <h3 className='title text-[45px] font-semibold text-center text-white px-5 sm:px-0 sm:max-w-[505px] mx-auto z-[1000]'>
                  {t('managedTitle')}
                </h3>
                <p className='text-white px-8 sm:px-0 sm:max-w-[400px] text-[16px] md:text-[24px] leading-[130%] mx-auto text-center '>
                  {t('managedDescription')}
                </p>
                <a href="#contact-landlords">
                  <div className='w-[170px] bg-red rounded-[12px] font-semibold text-center text-lg px-4 py-2 text-white my-2'>
                    {t('contactUs')}
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
        <div className=' sm:mb-[140px] mb-[60px]'>
          <h2 className='text-[40px] sm:text-[56px] font-bold px-5 sm:px-[60px] sm:pb-[50px] sm:pt-[120px] pb-[30px] pt-[60px]'>
            {t('whyKali')}
          </h2>
          <LandlordsCarousel />
        </div>
        <Image src={brownDividerSvg} alt="divider" width={1512} height={193} className="w-full sm:mt-[200px] mt-0  mx-auto" />


        <div className='w-full md:px-20 px-4 bg-brown  md:mt-[-11%]'>
          <h2 className="md:text-[64px] text-[45px] text-white title text-center ">{t('howItWorksTitle')}</h2>
          <p className="text-white text-center my-2 text-[20px] leading-[130%]">{t('howItWorksSubtitle')}</p>
          <div className='w-full'>
            <div className='flex flex-col flex-wrap xl:flex-nowrap sm:flex-row items-center lg:items-start justify-between gap-7 mt-12 pb-[200px]'>
              <div className='flex flex-col items-start p-6 gap-[21px] sm:w-[46%] xl:w-[315px] h-[270px] xl:h-[226px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
                <h3 className="text-white title text-[18px] ">01</h3>
                <h4 className="text-white title text-[24px] font-semibold">{t('step1Title')}</h4>
                <p className="text-white text-[18px] ">{t('step1Description')}</p>
              </div>

              <div className='flex flex-col items-start p-6 gap-[21px] sm:w-[46%] xl:w-[315px] h-[270px] xl:h-[226px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
                <h3 className="text-white text-[18px] ">02</h3>
                <h4 className="text-white title text-[24px] font-semibold">{t('step2Title')}</h4>
                <p className="text-white text-[18px] ">{t('step2Description')}</p>
              </div>

              <div className='flex flex-col items-start p-6 gap-[21px] sm:w-[46%] xl:w-[315px] h-[270px] xl:h-[226px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
                <h3 className="text-white text-[18px] ">03</h3>
                <h4 className="text-white title text-[24px] font-semibold">{t('step3Title')}</h4>
                <p className="text-white text-[18px] ">{t('step3Description')}</p>
              </div>

              <div className='flex flex-col items-start p-6 gap-[21px] sm:w-[46%] xl:w-[315px] h-[270px] xl:h-[226px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
                <h3 className="text-white text-[18px] ">04</h3>
                <h4 className="text-white title text-[24px] font-semibold">{t('step4Title')}</h4>
                <p className="text-white text-[18px] leading-[130%]">{t('step4Description')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='md:mb-[260px] mb-[100px]'>
          <LandlordsReviews />

        </div>

        <div id="contact-landlords" className=' pb-10'></div>

        <div id="" className='mb-[-10%] z-10 relative  md:px-10 px-5'>
          <LandlordsForm />
        </div>

      </main >
      <Footer />
    </>
  );

}
