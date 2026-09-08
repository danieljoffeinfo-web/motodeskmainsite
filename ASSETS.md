# Moto Desk integration symbols

Final assets are symbol-only, transparent, and ready to copy into the page's assets directory. The seven SVGs use a 64×64 viewBox and centered artwork. DiskDrive is a 1254×1254 RGBA PNG with a similar optical inset. No Site files were edited.

| Asset | Source | Notes |
|---|---|---|
| diskdrive.webp | Supplied `Image 2(10).jpeg` | Built-in imagegen cleanup/upscale and background extraction, then resized for the small keyboard surface. Near-black D plus original cyan–magenta swoosh. No official vector located. |
| meta.svg | [SVG Logos: meta-icon.svg](https://raw.githubusercontent.com/gilbarbara/logos/main/logos/meta-icon.svg) | Original blue gradient infinity symbol. |
| whatsapp.svg | [SVG Logos: whatsapp-icon.svg](https://raw.githubusercontent.com/gilbarbara/logos/main/logos/whatsapp-icon.svg) | Green speech bubble with white phone. |
| gmail.svg | [SVG Logos: google-gmail.svg](https://raw.githubusercontent.com/gilbarbara/logos/main/logos/google-gmail.svg) | Gradient M matching the supplied newer reference. |
| outlook.svg | [Microsoft artwork via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Microsoft_Outlook_Icon_(2025%E2%80%93present).svg) | 2025 blue envelope, matching supplied identity. [Direct SVG](https://upload.wikimedia.org/wikipedia/commons/c/cc/Microsoft_Outlook_Icon_%282025%E2%80%93present%29.svg). |
| excel.svg | [Microsoft artwork via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Microsoft_Office_Excel_(2019%E2%80%932025).svg) | 2019–2025 Excel artwork intentionally retained to match supplied reference. [Direct SVG](https://upload.wikimedia.org/wikipedia/commons/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg). |
| claude.svg | [Simple Icons: claude.svg](https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/claude.svg) | Source path, brand clay #D97757 from Simple Icons metadata; metadata source is https://claude.ai. |
| openai.svg | [SVG Logos: openai-icon.svg](https://raw.githubusercontent.com/gilbarbara/logos/main/logos/openai-icon.svg) | Reversed white for dark keycaps. Black original-color alternative: openai-black.svg. |

Alternative `whatsapp-outline.svg` uses [Simple Icons](https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/whatsapp.svg), #25D366. Curated repository source pages verified: [SVG Logos](https://github.com/gilbarbara/logos), [Simple Icons](https://github.com/simple-icons/simple-icons).

## Integration notes and limitations

- Use each logo as an ordinary image, object-fit: contain. Keep the fixed square canvas; do not stretch artwork.
- DiskDrive's original near-black symbol is low-contrast on a near-black key. A light silver/ivory key face works well, as shown in integration-symbol-preview.png. Do not invert the entire raster: that would invert the gradient too.
- DiskDrive is a generated reconstruction from a low-resolution supplied JPEG, not a mathematically exact official master. At the intended key-symbol size it is crisp and recognizable; brand-owner approval is recommended for larger brand-critical uses.
- White OpenAI is supplied for dark-key contrast; openai-black.svg preserves the supplied black appearance for light keys.
- Vector artwork itself is retained. Normalization only adds a square viewBox, optical insets, source-brand fills where the input was monochrome, and unique SVG IDs. Office file metadata/legacy XML entities were removed from normalized output.
- Source SVGs and metadata downloads are retained separately as `*-source.svg`/JSON for provenance. They are not needed by the page.

## DiskDrive editing prompt

Built-in imagegen mode, input edit target `/workspace/scratch/1a4bb9fdfb89/upload/Image 2(10).jpeg`:

Use case: background-extraction. Asset type: transparent integration logo symbol for a website. Input Image 1 is the edit target: supplied DiskDrive brand logo. Primary request: cleanly extract and upscale ONLY the symbol at the left of the image; completely remove the DiskDrive wordmark and white background. Keep the symbol's identity exactly: dark near-black thick stylized D outline with sharp diagonal notch at top left and lower opening; the narrow triangular swoosh traveling from lower-left toward upper-right has its original cyan-to-purple-to-magenta gradient. Match the supplied mark's proportions, silhouette, curves, and spacing precisely. This is a faithful cleanup/cutout, not a reinterpretation. Center the symbol on a 1024x1024 genuinely transparent background with around 12% empty margin. No wordmark, text, shadow, scene, keycap, lighting, bevel, new detail, or watermark. Preserve actual alpha transparency. The logo stays flat and crisp with smooth antialiased edges.

The original generated PNG is retained outside the website source. The deployed WebP is a 256px derivative for fast, crisp keycap rendering.
