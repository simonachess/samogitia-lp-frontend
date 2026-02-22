# Sanity: Block content for service description

The service detail page (`/paslaugos/[slug]`) now supports **block content** for the description. The page uses **longDescription** first, then **description** (same as before).

## In Sanity: change the service schema

In your Sanity project, open the **service** document schema and change **description** and/or **longDescription** to block content (array of blocks).

### Option A: Change one field (e.g. longDescription)

Use **longDescription** for the rich text shown on the detail page. Keep **description** as plain text for cards/lists if you use it elsewhere.

**longDescription** – replace with block content:

```js
{
  name: 'longDescription',
  type: 'array',
  title: 'Long description (detail page)',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false },
            ],
          },
        ],
      },
    },
  ],
}
```

### Option B: Change description only

If you only have **description** and no longDescription, change **description** to the same block content definition as above. The detail page will show it with the same rich styling.

## Frontend (already done)

- If **longDescription** or **description** is an **array** → rendered with `ProjectBody` and class **`service-description`** (headings, bold, lists, links).
- If it’s a **string** → split by newlines into paragraphs; wrapper uses class **`service-description`**.
- Meta description uses plain text (block content is converted to a string for SEO).
- To style service description only: edit `styles/global.css` → **`.service-description`** (separate from `.project-description` for project detail).
