import { BookIcon, LinkIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: BookIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      description:
        'This is your title for About page that will be displayed in the header of your website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description: 'This field is for your About description.',
      title: 'Description',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      description:
        '(Optional) This image will be displayed next to your About description.',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'aboutImageImage',
          title: 'About Image Item',
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'technicalAbilities',
      title: 'Awards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'technicalAbilitiesObject',
          title: 'Technical Abilities Object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'slug',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'pressAndAwards',
      title: 'Press and Awards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pressAndAwards',
          title: 'Press and Awards',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'aboutImageDraggables',
      title: 'About Image Draggables',
      description: 'About Page Draggables',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'aboutImageImage',
          title: 'About Image Item',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(7).error('You can only add up to 7 images'),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Portfolio PDF File',
      description: 'Upload a single PDF file',
      type: 'file',
      options: {
        accept: 'application/pdf', // 👈 restricts to PDF
      },
      validation: (Rule) => Rule.required().error('A PDF file is required'),
    }),
    defineField({
      name: 'aboutImageMainFace',
      title: 'About Image Heading Image',
      description: 'The image at the top of the about page',
      type: 'image',
      options: {
        hotspot: true, // allows selecting focus area
      },
    }),
    defineField({
      name: 'aboutImageMainMobileFace',
      title: 'About Image Heading Image for Mobile',
      description: 'The image at the top of the about page',
      type: 'image',
      options: {
        hotspot: true, // allows selecting focus area
      },
    }),
    defineField({
      name: 'aboutImageBouncingImage',
      title: 'About Image Bouncing Image',
      description: 'Bouncing Image',
      type: 'image',
      options: {
        hotspot: true, // allows selecting focus area
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About page',
      }
    },
  },
})
