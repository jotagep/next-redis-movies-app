# Storybook

Este proyecto utiliza Storybook para desarrollar y documentar componentes de UI de forma aislada.

## 🚀 Ejecutar Storybook

```bash
npm run storybook
```

Esto iniciará Storybook en `http://localhost:6006`

## 📦 Construir Storybook

Para generar una versión estática de Storybook:

```bash
npm run build-storybook
```

Los archivos se generarán en la carpeta `storybook-static/`

## 📚 Componentes Documentados

### Componentes Base

- **ButtonLink**: Botón de navegación con estado activo
- **Container**: Contenedor con padding horizontal
- **RatingBox**: Caja de puntuación con colores según rating
- **Spinner**: Indicador de carga
- **MovieImage**: Imagen con fallback para errores

### Componentes Compuestos

- **CardMovie**: Tarjeta de película con imagen, rating y favoritos
- **HeroMovie**: Sección hero con imagen de fondo y contenido
- **Topbar**: Barra de navegación con búsqueda

## ✏️ Crear Nuevas Stories

Para crear una nueva story, crea un archivo `.stories.tsx` junto a tu componente:

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs'
import MiComponente from './MiComponente'

const meta = {
  title: 'Components/MiComponente',
  component: MiComponente,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof MiComponente>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // props del componente
  }
}
```

## 🔧 Configuración

- **`.storybook/main.ts`**: Configuración principal con soporte para SCSS modules y aliases
- **`.storybook/preview.ts`**: Configuración global de decoradores y parámetros
- Las stories se localizan en `components/**/*.stories.tsx` y `features/**/*.stories.tsx`

## 📖 Documentación

Storybook incluye documentación automática generada a partir de las props de TypeScript. Usa el addon "Docs" para ver la documentación completa de cada componente.
