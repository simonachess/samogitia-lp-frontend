# Sanity: Use block content for project description (styled text)

To get **rich, styled description** (paragraphs, bold, headings, lists, links) on the project detail page, change the project schema in your **Sanity Studio** so `description` is block content instead of plain text.

## 1. In your Sanity project (backend/studio)

Find the schema definition for the **project** document type (e.g. `schemas/project.js` or `schemas/documents/project.js`).

### Replace the `description` field

**Before (plain text):**

```js
{
  name: 'description',
  type: 'text',
  title: 'Description',
  rows: 4,
}
```

**After (block content / Portable Text):**

```js
{
  name: 'description',
  type: 'array',
  title: 'Description',
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

If your schema uses a shared block type (e.g. `blockContent`), you can do:

```js
{
  name: 'description',
  type: 'array',
  title: 'Description',
  of: [{ type: 'block' }],  // use your shared block definition if you have one
}
```

Save, deploy/restart Sanity Studio. Existing projects with a string description may show empty until you re-enter content in the new block editor.

## 2. Frontend (already done)

- **Block content** is rendered by `RichBody` (`components/rich-body.js`) with styles in `styles/global.css` (`.rich-description`).
- To change how it looks, edit:
  - **Global**: `styles/global.css` → `.rich-description` (used for both project and service descriptions)
  - **Per element** (paragraphs, headings, lists, links): `components/rich-body.js` → `components` object

No other frontend changes are required once the API returns `description` as an array of blocks.
