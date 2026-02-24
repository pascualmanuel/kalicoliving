import { useTranslations } from 'next-intl';
import Image from 'next/image';
import homeImage from '../../public/assets/images/home/hero-image-kali.webp';
import dividerSvg from '../../public/assets/icons/divider.svg';
import PopupButton from '@/components/PopupButton';
import image from 'next/image';
import homeCard1 from '../../public/assets/images/home/home-card-1.webp';
import homeCard2 from '../../public/assets/images/home/home-card-2.webp';
import homeCard3 from '../../public/assets/images/home/home-card-3.webp';
import homeCard4 from '../../public/assets/images/home/home-card-4.webp';
import brownDividerSvg from '../../public/assets/icons/brown-divider.svg';
import ticIcon from '../../public/assets/icons/tic-icon.svg';
import redDviderSvg from '../../public/assets/icons/red-divider.svg';
import logoSvg from '../../public/assets/logos/logo.svg';
import Link from 'next/link';
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


      <div className="flex flex-col items-center justify-center ">
        <h2 className="text-[64px] text-black title text-center max-w-[675px]">More than a place to live. <br />
          <span className="recoleta text-red ">A place to belong.</span></h2>
        <p className="text-black text-center max-w-[430px] my-6 text-[20px]">Kali is a coliving experience where design meets community, creating experiences that stay with you.</p>
        <PopupButton />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-12 mx-auto'>
        {/* Card 1 */}
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[310px] h-[310px] rounded-xl overflow-hidden'>
            <Image
              src={homeCard1}
              alt="Real community"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Real community</h3>
          <p className="text-black text-center my-2 text-[16px]">Live with like-minded people who choose to step out of their comfort zone.</p>
        </div>

        {/* Card 2 */}
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[310px] h-[310px] rounded-xl overflow-hidden'>
            <Image
              src={homeCard2}
              alt="Card 2"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Thoughtfully designed spaces</h3>
          <p className="text-black text-center my-2 text-[16px]">Homes that are functional, warm, and ready so you can focus on living.</p>
        </div>

        {/* Card 3 */}
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[310px] h-[310px] rounded-xl overflow-hidden'>
            <Image
              src={homeCard3}
              alt="Card 3"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Shared moments</h3>
          <p className="text-black text-center my-2 text-[16px]">Dinners, conversations, working together, unexpected laughs.</p>
        </div>

        {/* Card 4 */}
        <div className='flex flex-col items-center justify-center'>
          <div className='w-[310px] h-[310px] rounded-xl overflow-hidden'>
            <Image
              src={homeCard4}
              alt="Card 4"
              width={310}
              height={310}
              className='w-full h-full object-cover'
            />
          </div>
          <h3 className="text-black title text-center text-[24px] mt-4">Growth</h3>
          <p className="text-black text-center my-2 text-[16px]">Every connection adds something new to your journey.</p>
        </div>
      </div>
      <div className='w-full h-full px-20 relative'>
        <div className='rounded-[20px] overflow-hidden'>
          <video src="/assets/videos/home-video.mp4" autoPlay muted loop playsInline className='w-full h-full object-cover' />
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
            <div className='flex flex-row justify-between w-full px-[140px]'>
              <div className='w-1/2'>
                <h2 className="text-[64px] text-white title  max-w-[675px]">Feel at home
                  <br /> <span className="recoleta text-white ">from day one</span></h2>
              </div>
              <div className='w-1/2 max-w-[412px]'>
                <p className="text-white my-2 text-[20px] leading-[130%]">Kali is built to turn everyday living into experiences that stay with you. Because where you live, and who you live with, shapes who you become.</p>
                <a href="#" className="">
                  <div className='w-[350px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-black  my-2 '>
                    Meet the community
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Image src={brownDividerSvg} alt="divider" width={1512} height={193} className="w-full mt-[200px] mb-[-250px] mx-auto" />

      <div className='w-full px-20 bg-brown  '>
        <h2 className="text-[64px] text-white title text-center ">How it works</h2>
        <p className="text-white text-center my-2 text-[20px] leading-[130%]">Find your next home in a few steps.</p>
        <div className='w-full'>
          <div className='flex  flex-row justify-between gap-7 mt-12 pb-[200px]'>
            {/* Card 1 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
              <h3 className="text-white title text-[18px] ">01</h3>
              <h4 className="text-white title text-[24px] font-semibold">Apply</h4>
              <p className="text-white text-[18px] ">Tell us about you and what you're looking for.</p>
            </div>

            {/* Card 2 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
              <h3 className="text-white text-[18px] ">02</h3>
              <h4 className="text-white title text-[24px] font-semibold">Connect</h4>
              <p className="text-white text-[18px] ">We'll contact you and have a conversation to get to know each other.</p>
            </div>

            {/* Card 3 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px]' style={{ background: 'rgba(255, 242, 226, 0.1)' }}>
              <h3 className="text-white text-[18px] ">03</h3>
              <h4 className="text-white title text-[24px] font-semibold">Match</h4>
              <p className="text-white text-[18px] ">We make sure Kali is the right fit, for you and for the community.</p>
            </div>

            {/* Card 4 */}
            <div className='flex flex-col items-start p-6 gap-[21px] w-[315px] h-[206px] rounded-[20px] bg-white' >
              <h3 className="text-black text-[18px] ">04</h3>
              <h4 className="text-black title text-[32px] font-semibold">Move in</h4>
              <p className="text-black text-[16px] leading-[130%]">Arrive with everything ready. Start living the experience.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full px-20 pt-[200px]'>
        <h2 className="text-[64px] text-black title text-center ">Kali is for you if...</h2>
        <div className='w-full flex items-center justify-center'>
          <div className='flex flex-col justify-between gap-4 mt-12'>
            <div className='w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want to meet new people and feel like a local from day one.</p>
            </div>
            <div className='w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You like stepping out of your comfort zone and saying yes to new plans</p>
            </div>
            <div className='w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want a home where someone’s always up for coffee, afterwork drinks, or dinner.</p>
            </div>
            <div className='w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want to move in without the stress — furniture, Wi-Fi, everything sorted.</p>
            </div>
            <div className='w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want more than a room — you want community and real connections.</p>
            </div>
            <div className='w-[699px] h-[56px] rounded-[12px] flex items-center justify-start gap-4 p-4' style={{ background: 'rgba(153, 106, 83, 0.1)' }}>
              <Image src={ticIcon} alt="tick icon" width={24} height={24} />
              <p className="text-black text-[16px] leading-[130%]">You want to grow around people who inspire you and push you further.</p>
            </div>
          </div>
        </div>
      </div>
      <Image src={redDviderSvg} alt="divider" width={1512} height={193} className="w-full mt-[200px] mb-[-250px] mx-auto" />

      <div className='w-full px-20  bg-red flex flex-col items-center justify-center pb-10 '>
        <h2 className="text-[64px] text-white title text-center ">Ready to live <br /> together?</h2>
        <a href="#" className="mt-8 mb-24">
          <div className='w-[350px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-2 text-black  my-2 '>
            Apply now
          </div>
        </a>
        <footer className='w-full py-[52px] px-[44px] rounded-[20px] bg-[#651514]'>
          <div className='flex flex-row justify-between border-b border-[#fff2e21c] pb-10 items-center'>
            <div>
              <Image src={logoSvg} alt="logo" width={156} height={100} />
            </div>
            <div className='flex flex-row justify-between gap-10'>
              <Link href="/blog" className='text-white text-[16px] leading-[130%]'>Blog</Link>
              <Link href="/community" className='text-white text-[16px] leading-[130%]'>Community</Link>
              <Link href="/landlords" className='text-white text-[16px] leading-[130%]'>Landlords</Link>
              <Link href="/apply" className='text-white text-[16px] leading-[130%]'>Apply</Link>
            </div>
          </div>
          <div className='flex flex-row justify-between mt-10'>
            <div className='flex flex-row justify-between gap-4'>
              <Link href="/privacy-policy" className='text-[#A95251] text-[14px] leading-[130%]'>Privacy Policy</Link>
              <Link href="/terms-of-service" className='text-[#A95251] text-[14px] leading-[130%]'>Terms & conditions</Link>
            </div>
            <div className='flex flex-row justify-between gap-4'>
              <Link href="https://www.labba.studio" className='text-[#A95251] text-[14px] leading-[130%]'>Made by Labba Studio</Link>
              <p className='text-[#A95251] text-[14px] leading-[130%]'>© {new Date().getFullYear()} Kali Coliving. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </main >

  );
}
