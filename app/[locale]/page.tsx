import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('pages.home');

  return (
    <main>
<h1 className='title text-white text-[40px] lg:text-[80px] font-bold max-w-[1000px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto text-center absolute'>{t('title')}</h1>
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
<img src="https://www.marie-claire.es/wp-content/uploads/sites/2/2024/07/08/668bc0fc66288.jpeg" alt="Home" />
    </main>
  );
}
