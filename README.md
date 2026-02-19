# Kali Coliving

Web para empresa de Co-Living en Madrid.

## Stack Tecnológico

- **Next.js 14** (App Router)
- **Sanity CMS** para gestión de contenido
- **Tailwind CSS** para estilos
- **next-intl** para internacionalización (i18n)
- **Vercel** para deploy

## Idiomas

- Español (default): `/es/`
- Inglés: `/en/`

Detección automática del idioma del navegador.

## Páginas

- Home (`/`)
- Landlords (`/landlords`)
- Blog (`/blog`)
- Community (`/community`)

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Editar `.env.local` y añadir:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID del proyecto Sanity
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset de Sanity (por defecto: `production`)

3. Ejecutar en desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
kali-coliving/
├── app/
│   └── [locale]/          # Rutas internacionalizadas
│       ├── page.tsx       # Home
│       ├── landlords/
│       ├── blog/
│       └── community/
├── components/            # Componentes reutilizables
├── i18n/                  # Configuración de i18n
├── lib/                   # Utilidades (Sanity client, etc.)
├── messages/              # Archivos de traducción
└── sanity/                # Schemas de Sanity
```

## Fases del Proyecto

### Fase 1 (Actual)
- Web informativa con blog
- Gestión de habitaciones desde Sanity
- Sección de habitaciones en Home

### Fase 2 (Futuro)
- Mapa interactivo con pisos disponibles
- Sistema de reservas

### Fase 3 (Futuro)
- Login y autenticación
- Comunidad para residentes
# kalicoliving
