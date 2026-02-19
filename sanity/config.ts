import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { roomSection, blogPost } from './schema';

export default defineConfig({
  name: 'default',
  title: 'Kali Coliving CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: [roomSection, blogPost],
  },
});
