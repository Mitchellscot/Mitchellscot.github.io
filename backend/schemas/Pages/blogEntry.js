import { FiExternalLink, FiLink } from "react-icons/fi/index";
import objectTypes from "../constants/objectTypes";
import pageTypes from "../constants/pageTypes";

export default {
  name: pageTypes.blogEntry,
  title: "Blog",
  type: "document",
  fields: [
    {
      title: "SEO Data",
      name: "seo",
      type: objectTypes.seo,
    },
    {
      name: "title",
      title: "Blog Entry Title",
      type: objectTypes.string,
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: objectTypes.slug,
      options: {
        source: "title",
        maxLength: 100,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 100),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Publish date",
      name: "publishDate",
      type: objectTypes.date,
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Preview Text",
      name: "preview",
      type: objectTypes.text,
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Text",
      name: "text",
      type: objectTypes.array,
      of: [
        {
          type: objectTypes.block,
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "internalLink",
                type: "object",
                blockEditor: {
                  icon: FiLink,
                },
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Reference",
                    to: [
                      {
                        type: "blogEntry",
                      },
                    ],
                  },
                ],
              },
              {
                title: "External Link",
                name: "externalLink",
                type: "object",
                blockEditor: {
                  icon: FiExternalLink,
                },
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["https", "http", "mailto", "tel"],
                      }),
                  },
                  {
                    title: "Open in new tab",
                    name: "blank",
                    type: "boolean",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          name: "image",
          title: "Image",
          fields: [
            {
              type: "string",
              name: "alt",
              title: "Alt Text",
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        {
          name: "code",
          title: "Code Block",
          type: "code",
          options: {
            theme: "monokai",
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Main Image",
      name: "mainImage",
      type: objectTypes.image,
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
