import { useTranslations } from 'next-intl';
import Image from 'next/image';
import People from '../../../public/assets/images/community/person-1.jpg';
import People2 from '../../../public/assets/images/community/person-2.jpg';
import People3 from '../../../public/assets/images/community/person-3.jpg';
import People4 from '../../../public/assets/images/community/person-4.jpg';
import People5 from '../../../public/assets/images/community/person-5.jpg';
import People6 from '../../../public/assets/images/community/person-6.jpg';
import IsoLogo from '../../../public/assets/logos/iso-logo.svg';
import dividerNotFilledSvg from '../../../public/assets/icons/divider-not-filled.svg';
// import dividerSvg from '../../../public/assets/icons/divider.svg';
export default function CommunityPage() {
  const t = useTranslations('pages.community');

  // Rotaciones base para los 14 isologos (-15° a 15°), luego se rotan 180° adicionales
  const isoRotations = [
    -15, -12, -9, -6, -3, 0, 3, 6, 9, 12, 15, -10, 8, -5
  ];

  // Posiciones y tamaños para las personas alrededor del hero (3 izquierda, 3 derecha)
  // Flotando de forma orgánica, cerca del centro
  const peoplePositions = [
    // Izquierda - 3 personas
    { top: '-30px', left: '-139px', size: 97, offsetY: '-10px' },
    { top: '52px', left: '-282px', size: 82, offsetY: '15px' },
    { top: '50%', left: '-139px', size: 65, offsetY: '-8px' },
    // Derecha - 3 personas
    { top: '-30px', right: '-139px', size: 80, offsetY: '-10px' },
    { top: '52px', right: '-282px', size: 95, offsetY: '15px' },
    { top: '40%', right: '-139px', size: 65, offsetY: '-8px' },



  ];

  return (
    <main>
      <div className="relative h-[calc(100vh+200px)] min-h-[670px] bg-red md:min-h-[900px] overflow-hidden flex flex-col items-center justify-center">
        {/* Isologos rotados 180° + rotación adicional, distribuidos por fuera */}
        {isoRotations.map((baseRotation, index) => {
          // Posiciones alejadas del centro, por fuera de las personas y el hero
          const positions = [
            { top: '5%', left: '15%' },
            { top: '12%', left: '25%' },
            { top: '20%', left: '12%' },
            { top: '75%', left: '18%' },
            { top: '82%', left: '28%' },
            { top: '60%', left: '15%' },
            { top: '5%', right: '15%' },
            { top: '12%', right: '25%' },
            { top: '20%', right: '12%' },
            { top: '10%', right: '40%' },
            { top: '60%', right: '28%' },
            { top: '60%', right: '15%' },
            { top: '50%', left: '2%' },
            { top: '50%', right: '2%' },
          ];
          const position = positions[index] || { top: '50%', left: '50%' };
          // Rotación de 180° + rotación base
          const totalRotation = 180 + baseRotation;

          return (
            <div
              key={`iso-${index}`}
              className="absolute  pointer-events-none"
              style={{
                ...position,
                transform: `rotate(${totalRotation}deg)`,
              }}
            >
              <Image
                src={IsoLogo}
                alt=""
                width={80}
                height={80}
                className="w-[50px] h-[50px] md:w-50px md:h-50px rotate-180"
              />
            </div>
          );
        })}

        {/* Imágenes de personas en círculos alrededor del hero (3 izquierda, 3 derecha) */}


        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <Image
              src={People}
              alt=""
              width={peoplePositions[0].size}
              height={peoplePositions[0].size}
              className="absolute rounded-full object-cover"
              style={{
                top: peoplePositions[0].top,
                left: peoplePositions[0].left,
                width: `${peoplePositions[0].size}px`,
                height: `${peoplePositions[0].size}px`,
                transform: `translateY(${peoplePositions[0].offsetY})`,
              }}
            />
            <Image
              src={People2}
              alt=""
              width={peoplePositions[1].size}
              height={peoplePositions[1].size}
              className="absolute rounded-full object-cover"
              style={{
                top: peoplePositions[1].top,
                left: peoplePositions[1].left,
                width: `${peoplePositions[1].size}px`,
                height: `${peoplePositions[1].size}px`,
                transform: `translateY(${peoplePositions[1].offsetY})`,
              }}
            />
            <Image
              src={People3}
              alt=""
              width={peoplePositions[2].size}
              height={peoplePositions[2].size}
              className="absolute rounded-full object-cover"
              style={{
                top: peoplePositions[2].top,
                left: peoplePositions[2].left,
                width: `${peoplePositions[2].size}px`,
                height: `${peoplePositions[2].size}px`,
                transform: `translateY(${peoplePositions[2].offsetY})`,
              }}
            />
            <Image
              src={People4}
              alt=""
              width={peoplePositions[3].size}
              height={peoplePositions[3].size}
              className="absolute rounded-full object-cover"
              style={{
                top: peoplePositions[3].top,
                right: peoplePositions[3].right,
                width: `${peoplePositions[3].size}px`,
                height: `${peoplePositions[3].size}px`,
                transform: `translateY(${peoplePositions[3].offsetY})`,
              }}
            />
            <Image
              src={People5}
              alt=""
              width={peoplePositions[4].size}
              height={peoplePositions[4].size}
              className="absolute rounded-full object-cover"
              style={{
                top: peoplePositions[4].top,
                right: peoplePositions[4].right,
                width: `${peoplePositions[4].size}px`,
                height: `${peoplePositions[4].size}px`,
                transform: `translateY(${peoplePositions[4].offsetY})`,
              }}
            />
            <Image
              src={People6}
              alt=""
              width={peoplePositions[5].size}
              height={peoplePositions[5].size}
              className="absolute rounded-full object-cover"
              style={{
                top: peoplePositions[5].top,
                right: peoplePositions[5].right,
                width: `${peoplePositions[5].size}px`,
                height: `${peoplePositions[5].size}px`,
                transform: `translateY(${peoplePositions[5].offsetY})`,
              }}
            />
          </div>
          <h3 className='text-white text-center text-[16] md:text-[18] tracking-[-3%] pb-8'>Kali community</h3>
          <h1 className='text-white font-bold text-center text-[50px]  sm:text-[100px] max-w-[270px] sm:max-w-[525px] title  !leading-[90%] sm:!leading-[80px]'>People that leave <span className='recoleta'> a mark</span></h1>
          <a href="#" className="mb-[130px] mt-6">
            <div className='w-[128px] bg-white rounded-[12px] semi-bold text-center font-semibold text-lg px-4 py-3 text-black my-2'>
              Join Kali
            </div>
          </a>
        </div>
        <Image
          src={dividerNotFilledSvg}
          alt="divider"
          width={1512}
          height={193}
          className="absolute bottom-0 left-0 w-full pointer-events-none rotate-180"
        />
      </div>
      <div className='w-full h-[200vh] relative'>

      </div>
    </main>
  );
}
