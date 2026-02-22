# Visual example: description as plain text vs block content (array)

## 1. Plain text (what you have now)

### In Sanity Studio

You see one text box. You type and press Enter for new lines:

```
┌─────────────────────────────────────────────────────────┐
│  Description                                            │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Šis projektas buvo įgyvendintas 2024 m.            │  │
│  │                                                    │  │
│  │ Darbai apėmė žemės lyginimą ir komunikacijų        │  │
│  │ tiesimą.                                           │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

→ Stored as **one string** (with `\n` for line breaks).

### What the API sends

```json
"description": "Šis projektas buvo įgyvendintas 2024 m.\n\nDarbai apėmė žemės lyginimą ir komunikacijų tiesimą."
```

### What the frontend renders

Two paragraphs (we split by `\n`). **No bold, no headings, no links.**

---

## 2. Block content / array (after you change the schema)

### In Sanity Studio

You see a **block editor**: each paragraph is a block, and you can format text (bold, links) and choose styles (Normal, H2, H3):

```
┌─────────────────────────────────────────────────────────┐
│  Description                                              │
│  ┌───────────────────────────────────────────────────┐   │
│  │ [Normal ▼]  Šis projektas buvo įgyvendintas...    │   │
│  │ [Normal ▼]  Darbai apėmė žemės lyginimą ir...     │   │
│  │ [H2     ▼]  Atlikti darbai                         │   │
│  │ [Normal ▼]  • Lyginimas  • Komunikacijos  [B] [I]  │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

→ Stored as **an array of blocks** (each block has style, and children with text/marks).

### What the API sends (simplified)

```json
"description": [
  {
    "_type": "block",
    "style": "normal",
    "children": [{ "_type": "span", "text": "Šis projektas buvo įgyvendintas 2024 m." }]
  },
  {
    "_type": "block",
    "style": "normal",
    "children": [{ "_type": "span", "text": "Darbai apėmė žemės lyginimą ir komunikacijų tiesimą." }]
  },
  {
    "_type": "block",
    "style": "h2",
    "children": [{ "_type": "span", "text": "Atlikti darbai" }]
  },
  {
    "_type": "block",
    "style": "normal",
    "children": [
      { "_type": "span", "text": "• Lyginimas  • ", "marks": [] },
      { "_type": "span", "text": "Komunikacijos", "marks": ["strong"] }
    ]
  }
]
```

### What the frontend renders

Styled HTML: paragraphs, **bold**, headings (H2), lists, links — all from `components/rich-body.js`.

```
  Šis projektas buvo įgyvendintas 2024 m.

  Darbai apėmė žemės lyginimą ir komunikacijų tiesimą.

  Atlikti darbai          ← heading (bigger, bold)

  • Lyginimas  • Komunikacijos   ← list / bold
```

---

## 3. Side-by-side summary

|                       | Plain text (string)               | Block content (array)                                            |
| --------------------- | --------------------------------- | ---------------------------------------------------------------- |
| **Sanity field type** | `text` or `string`                | `array` of `block`                                               |
| **In Studio**         | One text area, newlines only      | Block editor: paragraphs, H2, H3, **bold**, _italic_, links      |
| **API returns**       | `"description": "line1\n\nline2"` | `"description": [ { _type: "block", ... }, ... ]`                |
| **Frontend**          | We split by `\n` → multiple `<p>` | We use `<PortableText>` → `<p>`, `<h2>`, `<strong>`, `<a>`, etc. |
| **Styling**           | Same look for all lines           | Headings, lists, links get different styles                      |

You don’t type the array yourself. When you change the schema to **array of blocks**, Sanity Studio shows the block editor; when you type there, Sanity saves and returns the array. The frontend already knows how to turn that array into styled HTML.
