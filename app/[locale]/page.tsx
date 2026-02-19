import { useTranslations } from 'next-intl';
import Image from 'next/image';
import homeImage from '../../public/assets/images/home/hero-image-kali.webp';
import dividerSvg from '../../public/assets/icons/divider.svg';
export default function HomePage() {
  const t = useTranslations('pages.home');

  return (
    <main>
      <div className="relative h-screen min-h-[700px] max-h-[870px] overflow-hidden flex items-center justify-center">

        <Image
          src={homeImage}
          alt="Home background"
          fill
          priority
          className="object-cover scale-[1.3] origin-top-left object-[-30px_center]"
        />

        <h1 className="relative z-10 text-[100px] text-white title text-center max-w-[585px]">
          {t('title')}
        </h1>

        <Image
          src={dividerSvg}
          alt="divider"
          width={1512}
          height={193}
          className="absolute bottom-0 left-0 w-full pointer-events-none"
        />

      </div>


      <div className="flex flex-col items-center justify-center h-[100vh]">
        <h2 className="text-[40px] text-black title text-center max-w-[585px]"> {t('subtitle')}</h2>
      </div>

    </main>

  );
}
