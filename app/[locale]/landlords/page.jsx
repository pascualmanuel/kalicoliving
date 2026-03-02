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
export default function LandlordsPage() {
  const t = useTranslations('pages.landlords');

  return (
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
          <h1 className='text-white max-w-[850px] title text-center text-[50px] md:text-[80px]'>Potencia el rendimiento de tu propiedad</h1>
          <h2 className='text-white max-w-[510px] text-center text-[20px] md:text-[32px] leading-[100%]'>Asegura tus ingresos por alquiler. Nosotros nos ocupamos del resto.</h2>
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
        <div className='flex flex-row justify-between max-w-[985px] mx-auto'>
          <div className="flex flex-col text-center"> <h3 className='text-red text-[60px] font-semibold'>  100%</h3> <p className='text-[20px] font-semibold'>Pagos a tiempo</p>  </div>
          <div className="flex flex-col text-center">  <h3 className='text-red text-[60px] font-semibold' >100%</h3> <p className='text-[20px] font-semibold'>Taza de ocupación</p> </div>
          <div className="flex flex-col text-center">  <h3 className='text-red text-[60px] font-semibold' >24/7</h3> <p className='text-[20px] font-semibold'>Soporte disponible</p> </div>
        </div>
      </div>
      <div className='w-full h-auto px-[60px]'>
        <div className='w-full h-auto relative mx-auto bg-pink rounded-[16px] '>
          <Image src={groupImage} alt="group" width={1000} height={1000} className='w-full h-auto rounded-[16px] ' />
          <div className='absolute bottom-0 left-0 w-full h-full flex flex-col gap-5 items-center justify-end'>
            <h3 className=' title text-[45px] font-semibold text-center text-white px-5 sm:px-0 sm:max-w-[505px] mx-auto'> Tu propiedad gestionada de principio a fin.</h3>
            <p className='text-white px-8 sm:px-0 sm:max-w-[400px]  text-[18px] md:text-[24px] leading-[130%] mx-auto text-center'>
              Seleccionamos inquilinos, gestionamos pagos y resolvemos incidencias para que tú no tengas que preocuparte.</p>
            <a href="#" className="mb-10">
              <div className='w-[170px] bg-red rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-white  my-2 '>
                Contactanos
              </div>
            </a>
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-[40px] font-bold px-[60px] pb-[50px] pt-[120px]'>Por qué Kali</h2>
        <LandlordsCarousel />
      </div>
    </main >
  );
}
